import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { randomUUID } from 'crypto';

export class GetManyUserInputDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Number of the current page.',
    example: '2',
  })
  public page?: number | null;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Number of itens to be loaded per page.',
    example: '10',
  })
  perPage?: number | null;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Property name to filter the itens.',
    example: 'createdBy',
  })
  filterBy?: string | null;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Property value to filter the itens.',
    example: randomUUID(),
  })
  filterValue?: string | null;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Property name to sort the itens.',
    example: 'createdAt',
  })
  sortBy?: string | null;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Order to sort the itens.',
    example: 'asc',
  })
  sortOrder?: 'asc' | 'desc' | null;
}
