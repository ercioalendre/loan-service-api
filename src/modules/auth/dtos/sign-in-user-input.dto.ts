import { ApiProperty } from '@nestjs/swagger';
import { generatePassword } from '@utilities/generate-password';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export abstract class SignInUserInputDto {
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
  @ApiProperty({
    description: 'User password.',
    example: generatePassword(),
  })
  public readonly password: string;
}
