export class DeleteOneUserOutputDto {
  public readonly id: string;
  public readonly companyId?: string | null;
  public readonly fullName: string;
  public readonly isActive: boolean;
  public readonly createdAt: Date;
  public readonly createdBy: string;
}
