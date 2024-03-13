import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from '@nestjs/common';
import { LoanApplicationBaseInputDto } from './loan-application-base-input.dto';
import { IsJWT, IsOptional, IsString } from 'class-validator';

export class UpdateOneLoanApplicationInputDto extends PartialType(
  LoanApplicationBaseInputDto as Type<LoanApplicationBaseInputDto>,
) {
  @IsString()
  @IsOptional()
  @IsJWT()
  @ApiProperty({
    description: 'Token JWT.',
  })
  public readonly token?: string | null;
}
