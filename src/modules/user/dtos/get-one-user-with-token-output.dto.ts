import { UserModelBaseOutputDto } from './user-model-base-output.dto';

export class GetOneUserWithTokenOutputDto extends UserModelBaseOutputDto {
  public token: string;
}
