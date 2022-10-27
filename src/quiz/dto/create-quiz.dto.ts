import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, ArrayMinSize, ArrayMaxSize } from 'class-validator';

export class SubmitQuizDto {
  @IsArray()
  quiz;
}

export GetQuiz{
  @ApiProperty({example:})
  
}
