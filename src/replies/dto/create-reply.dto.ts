import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateReplyDto {
  @IsString()
  @IsNotEmpty()
  userId: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  postId: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  content: string;
}
export class ReplyResponse {
  @ApiProperty()
  userId: string;
  @ApiProperty()
  postId: string;
  @ApiProperty()
  content: string;
}
