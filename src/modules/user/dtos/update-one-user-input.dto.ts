import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from '@nestjs/common';
import { UserBaseInputDto } from './user-base-input.dto';
import { IsJWT, IsOptional, IsString } from 'class-validator';

export class UpdateOneUserInputDto extends PartialType(
  UserBaseInputDto as Type<UserBaseInputDto>,
) {
  @IsString()
  @IsOptional()
  @IsJWT()
  @ApiProperty({
    description: 'Token JWT.',
  })
  public readonly token?: string | null;
}
