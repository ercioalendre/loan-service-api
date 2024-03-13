import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { randomUUID } from 'crypto';

export abstract class LoanApplicationBaseInputDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Loan application applicant ID.',
    example: randomUUID(),
  })
  public applicantId?: string | null;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Loan application requested amount.',
    example: 10000,
  })
  public requestedAmount: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Loan application purpose.',
    example: 'Buy a house.',
  })
  public loanPurpose: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Loan application collateral description.',
    example: 'Buy a house.',
  })
  public collateralDescription?: string | null;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    description: 'Loan application collateral value.',
    example: 50000,
  })
  public collateralValue?: number | null;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Loan application interest rate.',
    example: 1.99,
  })
  public interestRate: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Loan application term.',
    example: '72 months',
  })
  public loanTerm: string;
}
