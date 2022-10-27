import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, ArrayMinSize, ArrayMaxSize } from 'class-validator';

export class SubmitQuizDto {
  @ApiProperty({
    example: [
      {
        id: '00d8f773-5447-4f8e-85bb-4057820e2c5a',
        answer: '488fa59e-9b44-4f98-a77e-60735ac86ddf',
      },
      {
        id: '135ddec9-12b4-4e28-8f99-8a97b62afe81',
        answer: '135ddec9-12b4-4e28-8f99-8a97b62afe81',
      },
      {
        id: '27fbd3ba-d1ed-4d7a-b8ef-59261fc3be75',
        answer: 'c4e46deb-8b9b-4ea8-ac8a-8905e889f614',
      },
      {
        id: '7821f0da-3369-47b1-89b8-34e826cdc4fa',
        answer: '69cadbf8-d3c8-42ba-8376-23add72abb92',
      },
    ],
  })
  @IsArray()
  quiz;
}

export class GetQuiz {
  @ApiProperty({
    example: [
      {
        quest: {
          id: '157dcc5e-ad99-49d5-8291-71351512bc66',
          text: 'What is the Name?',
        },
        randomedOptions: [
          {
            text: 'Walid',
            id: '4d3dd1ed-9a98-416b-84bb-9717c7e4ab2b',
          },
          {
            text: 'Samir',
            id: 'a90f87d1-2f9e-4a4d-8eae-a7e8a6fb5a18',
          },
          {
            text: 'Diaa',
            id: '4045e6d1-1e72-42b1-8c4d-430e0e763196',
          },
          {
            text: 'Mohamed',
            id: '0a1520b7-d160-497e-923a-8bbfc2cca58e',
          },
        ],
      },
    ],
  })
  quizz;
}

export class Result {
  @ApiProperty({
    example: [
      {
        question: 'What is the Name?',
        answer: 'Diaa',
      },
      {
        question: 'What is his Name?',
        answer: 'Diaa',
      },
      {
        question: 'What is ?',
        answer: 'Diaa',
      },
    ],
  })
  wrongAnswers;
  @ApiProperty({ example: 1 })
  points;
}
