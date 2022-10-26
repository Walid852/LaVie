import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  userId: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Post Title',
  })
  title: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Post content',
  })
  content: string;
  @IsString()
  Photo: string;
  @ApiProperty({ type: 'string', format: 'binary', required: false })
  file: any;
}
export class PostResponse {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Post Title',
  })
  Title: string;
  @IsString()
  @ApiProperty({
    example: 'Post content',
  })
  Content: string;
  @IsString()
  @ApiProperty({
    example:
      'C:\\Users\\WinDows\\LaVie\\temp\\uploads\\Postimages\\223885c8e7e70-8b2a-4703-80c9-b5e0de15543c.jpg',
  })
  photoURL: string;
  @IsString()
  @ApiProperty({
    example: '524k-juh-5848-ent',
  })
  userId: string;
}
