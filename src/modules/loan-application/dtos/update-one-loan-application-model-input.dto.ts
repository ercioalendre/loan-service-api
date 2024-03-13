import { Type } from '@nestjs/common';
import { LoanApplicationModelBaseInputDto } from './loan-application-model-base-input.dto';
import { PartialType } from '@nestjs/mapped-types';

export abstract class UpdateOneLoanApplicationModelInputDto extends PartialType(
  LoanApplicationModelBaseInputDto as Type<LoanApplicationModelBaseInputDto>,
) {
  public unhashedPassword?: string | null;

  public token?: string | null;

  public updatedAt: Date;

  public updatedBy?: string | null;
}
