import { ConflictException, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { hash } from 'bcrypt';
import { StaticErrors } from '@static/static-errors';
import { AppCrypto } from '@utilities/app-crypto';
import { StaticKeys } from '@static/static-keys';
import { UserPrismaRepository } from '@modules/user/repositories/user.prisma.repository';
import { CreateOneUserInputDto } from '@modules/user/dtos/create-one-user-input.dto';
import { CreateOneUserOutputDto } from '@modules/user/dtos/create-one-user-output.dto';
import { CreateOneUserModelInputDto } from '@modules/user/dtos/create-one-user-model-input.dto';
import { ConfigService } from '@nestjs/config';
// import { UserBaseOutputDto } from '@modules/user/dtos/user-base-output.dto';
import { Role } from '@modules/user/constants/role.enum';

@Injectable()
export class CreateOneUserService {
  constructor(
    private readonly userPrismaRepository: UserPrismaRepository,
    private readonly appCrypto: AppCrypto,
    private readonly configService: ConfigService,
  ) {}

  public async execute(
    createOneUserInputDto: CreateOneUserInputDto,
    // sessionUser?: UserBaseOutputDto | null,
  ): Promise<CreateOneUserOutputDto> {
    // if (createOneUserInputDto.role && sessionUser?.role !== Role.Admin) {
    //   createOneUserInputDto.role = Role.Applicant;
    // }

    if (createOneUserInputDto.email) {
      const encryptedEmail = this.appCrypto.encrypt(
        createOneUserInputDto.email,
        StaticKeys.USER_ENCRYPTION_KEYS.email,
      );

      const emailExists = await this.userPrismaRepository.getOne({
        email: encryptedEmail,
      });

      if (emailExists) {
        throw new ConflictException(
          StaticErrors.THE_GIVEN_EMAIL_ADDRESS_IS_ALREADY_TAKEN,
        );
      }
    }

    if (createOneUserInputDto.phone) {
      const encryptedPhone = this.appCrypto.encrypt(
        createOneUserInputDto.phone,
        StaticKeys.USER_ENCRYPTION_KEYS.phone,
      );

      const phoneExists = await this.userPrismaRepository.getOne({
        phone: encryptedPhone,
      });

      if (phoneExists) {
        throw new ConflictException(
          StaticErrors.THE_GIVEN_PHONE_NUMBER_IS_ALREADY_TAKEN,
        );
      }
    }

    const hashedPassword = await hash(
      createOneUserInputDto.password,
      Number(this.configService.getOrThrow('PASSWORD_SALT')),
    );

    const decryptedNewUserModel = {
      id: randomUUID(),
      ...createOneUserInputDto,
      isActive: true,
      createdAt: new Date(),
      createdBy: undefined,
    };

    const encryptedNewUserModel =
      this.appCrypto.encryptData<CreateOneUserModelInputDto>(
        {
          ...decryptedNewUserModel,
          role: createOneUserInputDto.role || Role.Applicant,
          password: hashedPassword,
        },
        StaticKeys.USER_ENCRYPTION_KEYS,
      );

    const encryptedCreatedUser = await this.userPrismaRepository.createOne(
      encryptedNewUserModel,
    );

    return this.appCrypto.decryptData(
      encryptedCreatedUser,
      StaticKeys.USER_ENCRYPTION_KEYS,
    );
  }
}
