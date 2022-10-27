import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
  IsNotEmpty,
} from 'class-validator';
export class CreateQuestionDto {
  @ApiProperty({ example: 'What is your Name?' })
  @IsString()
  @IsNotEmpty()
  question;
  @ApiProperty({ example: ['Diaa', 'Mohamed', 'Walid', 'Samir'] })
  @IsArray()
  @ArrayMaxSize(4)
  @ArrayMinSize(2)
  options;
}
export class CreatedQuestion {
  @ApiProperty({
    example: {
      id: '02f2abd0-16bf-485a-bdef-1bcb2ca629e0',
      text: 'What is your Name?',
    },
  })
  question;
  @ApiProperty({
    example: [
      {
        id: '0eb30fe5-8016-4b19-ac5a-30faf90f2637',
        text: 'Diaa',
        questionId: '02f2abd0-16bf-485a-bdef-1bcb2ca629e0',
      },
      {
        id: 'a56bd39c-d1dc-43c0-8957-5f5743109358',
        text: 'Mohamed',
        questionId: '02f2abd0-16bf-485a-bdef-1bcb2ca629e0',
      },
      {
        id: 'e3fc27ce-bd3e-4b6b-99ec-0c1c56831994',
        text: 'Walid',
        questionId: '02f2abd0-16bf-485a-bdef-1bcb2ca629e0',
      },
      {
        id: '54ad1d1f-240e-4f27-968a-81885cf62c8a',
        text: 'Samir',
        questionId: '02f2abd0-16bf-485a-bdef-1bcb2ca629e0',
      },
    ],
  })
  options;
  @ApiProperty({ example: 'Diaa' })
  answer;
}

export class GetQuestions {
  @ApiProperty({
    example: [
      {
        question: {
          id: '02f2abd0-16bf-485a-bdef-1bcb2ca629e0',
          text: 'What is your Name?',
        },
        options: [
          {
            text: 'Diaa',
            id: '0eb30fe5-8016-4b19-ac5a-30faf90f2637',
          },
          {
            text: 'Samir',
            id: '54ad1d1f-240e-4f27-968a-81885cf62c8a',
          },
          {
            text: 'Mohamed',
            id: 'a56bd39c-d1dc-43c0-8957-5f5743109358',
          },
          {
            text: 'Walid',
            id: 'e3fc27ce-bd3e-4b6b-99ec-0c1c56831994',
          },
        ],
      },
    ],
  })
  questionsAndOptions;
}

export class GetQuesiton {
  @ApiProperty({
    example: {
      id: '7b00b358-999b-450d-afe5-890abf69ffc0',
      text: 'What is his Name?',
    },
  })
  question;
  @ApiProperty({
    example: [
      {
        text: 'Samir',
        id: '71cf2073-2926-4b2f-9b3f-9c9441bb21a5',
      },
      {
        text: 'Walid',
        id: '7a341b88-8c40-4da2-9e08-fe3248d97609',
      },
      {
        text: 'Diaa',
        id: 'a9e922ae-b2a7-40bd-bb76-830762dc5f97',
      },
      {
        text: 'Mohamed',
        id: 'dd391338-3610-47a2-9499-b6fcd4a5c7d8',
      },
    ],
  })
  options;
}

export class DeletedQuestions {
  @ApiProperty({ example: 'Qestion deleted successfully' })
  message;
}
