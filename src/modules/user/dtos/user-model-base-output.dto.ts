export abstract class UserModelBaseOutputDto {
  public readonly id: string;
  public readonly fullName: string;
  public readonly email: string;
  public readonly phone: string;
  public readonly role: string;
  public readonly isActive: boolean;
  public readonly createdAt: Date;
  public readonly createdBy: string;
}
