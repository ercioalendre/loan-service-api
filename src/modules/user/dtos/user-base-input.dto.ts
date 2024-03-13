import { Role } from '@modules/user/constants/role.enum';
import { ApiProperty } from '@nestjs/swagger';
import { generatePassword } from '@utilities/generate-password';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
} from 'class-validator';

export abstract class UserBaseInputDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'User full name.',
    example: 'John Doe',
  })
  public fullName: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'User email address.',
    example: 'john.doe@system.com',
  })
  public email: string;

  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber('US')
  @Matches('^\\(\\d{3}\\) \\d{3}-\\d{4}$')
  @ApiProperty({
    description: 'User phone.',
    example: '(555) 555-5555',
  })
  public phone: string;

  @IsEnum(Role)
  @IsOptional()
  @ApiProperty({
    description: 'User role.',
    example: 0,
    enum: () => Role,
  })
  public role?: Role | null;

  @IsString()
  @Matches(
    '^(?=(?:[^A-Z]*[A-Z]){2})(?=(?:[^a-z]*[a-z]){3})(?=(?:\\D*\\d){3})(?=(?:[^\\W_]*[\\W_]){2})[A-Za-z\\d\\W_]{10,}$',
  )
  @IsNotEmpty()
  @ApiProperty({
    description: 'User password.',
    example: generatePassword(),
  })
  public password: string;
}
