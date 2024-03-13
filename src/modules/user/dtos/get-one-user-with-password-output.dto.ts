import { UserModelBaseOutputDto } from './user-model-base-output.dto';

export class GetOneUserWithPasswordOutputDto extends UserModelBaseOutputDto {
  public password: string;
}
