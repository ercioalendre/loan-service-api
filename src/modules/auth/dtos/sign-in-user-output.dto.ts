import { ApiProperty } from '@nestjs/swagger';
import { IsJWT, IsNotEmpty, IsString } from 'class-validator';

export abstract class SignInUserOutputDto {
  @IsString()
  @IsNotEmpty()
  @IsJWT()
  @ApiProperty({
    description: 'Token JWT.',
  })
  public readonly token: string;
}
