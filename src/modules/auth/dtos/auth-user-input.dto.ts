import { AuthUserBaseDto } from './auth-user-base.dto';

export abstract class AuthUserInputDto extends AuthUserBaseDto {
  public readonly token: string;
  public readonly password: string;
}
