import { IsString, IsArray, ArrayMinSize, ArrayMaxSize } from 'class-validator';
export class CreateQuestionDto {
  @IsString()
  question;
  @IsArray()
  @ArrayMaxSize(4)
  @ArrayMinSize(2)
  options;
}
