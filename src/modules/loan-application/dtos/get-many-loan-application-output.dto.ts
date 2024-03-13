import { LoanApplicationBaseOutputDto } from './loan-application-base-output.dto';

export class GetManyLoanApplicationOutputDto {
  public readonly data: LoanApplicationBaseOutputDto[];
  public readonly currentPage: number;
  public readonly perPage: number;
  public readonly lastPage: number;
  public readonly totalRecords: number;
}
