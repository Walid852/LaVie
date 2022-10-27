import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateQuestionDto } from './create-question.dto';

export class UpdateQuestionDto extends PartialType(CreateQuestionDto) {}

export class UpdatedQuestion {
  @ApiProperty({
    example: {
      id: '02f2abd0-16bf-485a-bdef-1bcb2ca629e0',
      text: 'What is your Name?',
    },
  })
  updatedQuestion;
  @ApiProperty({
    example: [
      {
        id: '1d829219-14e2-4731-a2f7-e27bd59c9f31',
        text: 'Diaa',
        questionId: '02f2abd0-16bf-485a-bdef-1bcb2ca629e0',
      },
      {
        id: 'aa614f5f-ee3e-4714-b753-11f81d5727e7',
        text: 'Mohamed',
        questionId: '02f2abd0-16bf-485a-bdef-1bcb2ca629e0',
      },
      {
        id: 'f2d24f72-6250-4c03-9ad5-b020ea0c928a',
        text: 'Walid',
        questionId: '02f2abd0-16bf-485a-bdef-1bcb2ca629e0',
      },
      {
        id: '386beeff-016c-4a2d-a093-8f5531242cc6',
        text: 'Samir',
        questionId: '02f2abd0-16bf-485a-bdef-1bcb2ca629e0',
      },
    ],
  })
  options;

  @ApiProperty({ example: 'Diaa' })
  updatedAnswer;
}
