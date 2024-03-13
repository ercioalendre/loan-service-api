export abstract class AuthUserBaseDto {
  public readonly id: string;
  public readonly fullName: string;
  public readonly nickname?: string | null;
  public readonly email: string;
  public readonly phone: string;
  public readonly isActive: boolean;
  public readonly createdAt: Date;
  public readonly createdBy?: string | null;
  public readonly updatedAt?: Date | null;
  public readonly updatedBy?: string | null;
  public readonly isActiveChangedAt?: Date | null;
  public readonly isActiveChangedBy?: string | null;
}
