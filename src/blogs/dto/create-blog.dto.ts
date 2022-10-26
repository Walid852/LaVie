import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBlogDto {
  @IsString()
  @IsNotEmpty()
  Title: string;
  @IsString()
  Content: string;
  @IsString()
  photoURL: string;
  @IsString()
  userId: string;
}
