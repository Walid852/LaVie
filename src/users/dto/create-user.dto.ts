import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'wm75380@gmail.com',
  })
  email: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'w16562#@df',
  })
  password: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Walid',
  })
  firstName: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Mohamed',
  })
  lastName: string;
}
export class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}
