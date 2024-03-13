import { LoanApplicationModelBaseOutputDto } from './loan-application-model-base-output.dto';

export class GetOneLoanApplicationWithTokenOutputDto extends LoanApplicationModelBaseOutputDto {
  public token: string;
}
