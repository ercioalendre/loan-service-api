import { LoanApplicationModelBaseOutputDto } from './loan-application-model-base-output.dto';

export class GetOneLoanApplicationWithPasswordOutputDto extends LoanApplicationModelBaseOutputDto {
  public password: string;
}
