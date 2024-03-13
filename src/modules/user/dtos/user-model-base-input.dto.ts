export abstract class UserModelBaseInputDto {
  public id: string;
  public fullName: string;
  public email: string;
  public phone: string;
  public role: string;
  public password: string;
  public isActive: boolean;
  public createdAt: Date;
  public createdBy: string;
}
