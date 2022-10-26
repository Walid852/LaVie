import { IsString, IsArray, ArrayMinSize, ArrayMaxSize } from 'class-validator';

export class SubmitQuizDto {
  @IsArray()
  quiz;
}
