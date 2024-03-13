import { Injectable, UnauthorizedException } from '@nestjs/common';
import { StaticErrors } from '@static/static-errors';
import { compare } from 'bcrypt';
import { UserPrismaRepository } from '@modules/user/repositories/user.prisma.repository';
import { JwtService } from '@nestjs/jwt';
import { SignInUserInputDto } from './dtos/sign-in-user-input.dto';
import { AuthUserInputDto } from './dtos/auth-user-input.dto';
import { AuthUserOutputDto } from './dtos/auth-user-output.dto';
import { AppCrypto } from '@utilities/app-crypto';
import { StaticKeys } from '@static/static-keys';

@Injectable()
export class AuthService {
  constructor(
    private readonly userPrismaRepository: UserPrismaRepository,
    private readonly jwtService: JwtService,
    private readonly appCrypto: AppCrypto,
  ) {}

  async signInUser(signInUserInputDto: SignInUserInputDto): Promise<any> {
    const encryptedEmail = this.appCrypto.encrypt(
      String(signInUserInputDto.email),
      StaticKeys.USER_ENCRYPTION_KEYS.email,
    );

    const encryptedUserExists =
      await this.userPrismaRepository.getOneByEmailWithPassword(encryptedEmail);

    if (!encryptedUserExists || !encryptedUserExists.isActive) {
      throw new UnauthorizedException(StaticErrors.INVALID_CREDENTIALS);
    }

    const passwordComparison = await compare(
      signInUserInputDto.password,
      encryptedUserExists.password,
    );

    if (!passwordComparison) {
      throw new UnauthorizedException(StaticErrors.INVALID_CREDENTIALS);
    }

    const decryptedUser = this.appCrypto.decryptData(
      encryptedUserExists,
      StaticKeys.USER_ENCRYPTION_KEYS,
    );

    const token = await this.jwtService.signAsync(
      {
        fullName: decryptedUser.fullName,
        role: decryptedUser.role,
      },
      {
        subject: decryptedUser.id,
        expiresIn: '1d',
        audience: process.env.JWT_AUTH_USER_AUDIENCE,
      },
    );

    await this.userPrismaRepository.updateOneById(decryptedUser.id, {
      token,
      updatedAt: new Date(),
      updatedBy: null,
    });

    return { token };
  }

  public async userMe(
    authUserInputDto: AuthUserInputDto,
  ): Promise<AuthUserOutputDto> {
    if (!authUserInputDto?.id) {
      throw new UnauthorizedException(StaticErrors.INVALID_CREDENTIALS);
    }

    return authUserInputDto;
  }
}
