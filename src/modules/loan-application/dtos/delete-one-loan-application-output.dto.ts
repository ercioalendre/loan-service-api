export class DeleteOneLoanApplicationOutputDto {
  public id: string;
  public applicantId?: string | null;
  public requestedAmount: number;
  public loanPurpose: string;
  public collateralDescription?: string | null;
  public collateralValue?: number | null;
  public interestRate: number;
  public loanTerm: string;
  public status: string;
  public isActive: boolean;
  public createdAt: Date;
  public createdBy: string;
}
