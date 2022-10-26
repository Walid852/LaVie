import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBlogDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Blog Title',
  })
  Title: string;
  @IsString()
  @ApiProperty({
    example: 'BBlog content',
  })
  Content: string;
  @IsString()
  photoURL: string;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  file: any;
  @IsString()
  userId: string;
}
export class BlogResponse {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Blog Title',
  })
  Title: string;
  @IsString()
  @ApiProperty({
    example: 'BBlog content',
  })
  Content: string;
  @IsString()
  @ApiProperty({
    example:
      'C:\\Users\\WinDows\\LaVie\\temp\\uploads\\Blogimages\\223885c8e7e70-8b2a-4703-80c9-b5e0de15543c.jpg',
  })
  photoURL: string;
  @IsString()
  @ApiProperty({
    example: '524k-juh-5848-ent',
  })
  userId: string;
}
