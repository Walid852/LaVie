import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '14 Elzamaly street Helwan Egypt',
  })
  Address?: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 0,
  })
  points: number;
}
