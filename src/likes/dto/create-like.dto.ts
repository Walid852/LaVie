import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLikeDto {
  @IsString()
  @IsNotEmpty()
  userId: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  postId: string;
}
export class LikeResponse {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  userId: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  postId: string;
}
