import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { StaticErrors } from '@static/static-errors';
import { UserPrismaRepository } from '@modules/user/repositories/user.prisma.repository';
import { IS_PUBLIC_KEY } from '@decorators/public.decorator';
import { Reflector } from '@nestjs/core';
import { AppCrypto } from '@utilities/app-crypto';
import { StaticKeys } from '@static/static-keys';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserPrismaRepository,
    private readonly reflector: Reflector,
    private readonly appCrypto: AppCrypto,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException(StaticErrors.INVALID_CREDENTIALS);
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        issuer: process.env.APP_NAME,
        audience: process.env.JWT_AUTH_USER_AUDIENCE,
        secret: process.env.JWT_AUTH_SECRET,
      });

      const encryptedUserExists = await this.userRepository.getOneByIdWithToken(
        payload.sub,
      );

      if (!encryptedUserExists) {
        throw new UnauthorizedException(StaticErrors.INVALID_CREDENTIALS);
      }

      if (encryptedUserExists.token !== token) {
        throw new UnauthorizedException(StaticErrors.INVALID_CREDENTIALS);
      }

      encryptedUserExists.token = undefined;

      const decryptedUser = this.appCrypto.decryptData(
        encryptedUserExists,
        StaticKeys.USER_ENCRYPTION_KEYS,
      );

      request['sessionUser'] = decryptedUser;
    } catch {
      throw new UnauthorizedException(StaticErrors.INVALID_CREDENTIALS);
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }
}
