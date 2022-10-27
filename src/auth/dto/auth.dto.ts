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
export class tempUser {
  @ApiProperty()
  id: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  points: string;
  @ApiProperty()
  profilePic: string;
  @ApiProperty()
  address: string;
  @ApiProperty()
  createdAt: string;
}
export class DataResponse {
  @ApiProperty()
  accessToken: string;

  @ApiProperty({ type: tempUser })
  user;
}

export class DataResponseSignIn {
  @ApiProperty()
  accessToken: string;
}
