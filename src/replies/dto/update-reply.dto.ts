import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateReplyDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  content: string;
}
