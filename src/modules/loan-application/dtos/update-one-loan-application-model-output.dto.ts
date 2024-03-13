import { LoanApplicationModelBaseOutputDto } from './loan-application-model-base-output.dto';

export abstract class UpdateOneLoanApplicationModelOutputDto extends LoanApplicationModelBaseOutputDto {
  public readonly token?: string | null;

  public readonly updatedAt: Date;

  public readonly updatedBy?: string | null;
}
