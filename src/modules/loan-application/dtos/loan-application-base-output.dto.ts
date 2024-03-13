export abstract class LoanApplicationBaseOutputDto {
  public readonly id: string;
  public readonly applicantId?: string | null;
  public readonly requestedAmount: number;
  public readonly loanPurpose: string;
  public readonly collateralDescription?: string | null;
  public readonly collateralValue?: number | null;
  public readonly interestRate: number;
  public readonly loanTerm: string;
  public readonly status: string;
  public readonly isActive: boolean;
  public readonly createdAt: Date;
  public readonly createdBy?: string | null;
  public readonly updatedAt?: Date | null;
  public readonly updatedBy?: string | null;
  public readonly isActiveChangedAt?: Date | null;
  public readonly isActiveChangedBy?: string | null;
}
