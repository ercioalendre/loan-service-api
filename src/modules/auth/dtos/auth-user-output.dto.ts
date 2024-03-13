import { AuthUserBaseDto } from './auth-user-base.dto';

export abstract class AuthUserOutputDto extends AuthUserBaseDto {
  public readonly password?: string | null;
  public readonly token?: string | null;
}
