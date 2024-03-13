import { UserModelBaseOutputDto } from './user-model-base-output.dto';

export abstract class UpdateOneUserModelOutputDto extends UserModelBaseOutputDto {
  public readonly token?: string | null;

  public readonly updatedAt: Date;

  public readonly updatedBy?: string | null;
}
