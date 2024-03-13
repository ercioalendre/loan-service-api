import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

export class StaticKeys {
  public static USER_ENCRYPTION_KEYS = Object.freeze({
    email: configService.getOrThrow('USER_EMAIL_ENCRYPTION_KEY'),
    phone: configService.getOrThrow('USER_PHONE_ENCRYPTION_KEY'),
    role: configService.getOrThrow('USER_ROLE_ENCRYPTION_KEY'),
  });
}
