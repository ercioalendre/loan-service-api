import { Injectable, NotFoundException } from '@nestjs/common';
import { AppCrypto } from '@utilities/app-crypto';
import { StaticKeys } from '@static/static-keys';
import { UserPrismaRepository } from '@modules/user/repositories/user.prisma.repository';
import { GetOneUserOutputDto } from '@modules/user/dtos/get-one-user-output.dto';
import { StaticErrors } from '@static/static-errors';

@Injectable()
export class GetOneUserByIdService {
  constructor(
    private readonly userPrismaRepository: UserPrismaRepository,
    private readonly appCrypto: AppCrypto,
  ) {}

  public async execute(id: string): Promise<GetOneUserOutputDto> {
    const encryptedUser = await this.userPrismaRepository.getOne({
      id,
    });

    if (!encryptedUser) {
      throw new NotFoundException(
        StaticErrors.THE_USER_YOU_ARE_LOOKING_FOR_RELATED_TO_THE_GIVEN_ID_DOES_NOT_EXIST,
      );
    }

    return this.appCrypto.decryptData(
      encryptedUser,
      StaticKeys.USER_ENCRYPTION_KEYS,
    );
  }
}
