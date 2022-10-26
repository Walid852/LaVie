import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'wm75380@gmail.com',
  })
  email: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'walid1235678',
  })
  password: string;
  @IsString()
  @ApiProperty({
    example: 'walid',
  })
  firstName: string;
  @IsString()
  @ApiProperty({
    example: 'Ahmed',
  })
  lastName: string;
  @IsString()
  role: string;
}
export class AuthDtoSignIn {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'wm75381@gmail.com',
  })
  email: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'walid1235678',
  })
  password: string;
}

export class DataResponse {
  @ApiProperty()
  accessToken: string;

  @ApiProperty({ type: AuthDto })
  user;
}
export class DataResponseSignIn {
  @ApiProperty()
  accessToken: string;
}
