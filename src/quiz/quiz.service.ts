import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Question } from 'src/question/entities/question.entity';
import { SubmitQuizDto } from './dto/create-quiz.dto';

const random_options = function (options) {
  let currentIndex = options.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [options[currentIndex], options[randomIndex]] = [
      options[randomIndex],
      options[currentIndex],
    ];
  }
  return options;
};

@Injectable()
export class QuizService {
  constructor(private prismaService: PrismaService) {}
  async submit(submitQuizDto: SubmitQuizDto, id: string) {
    const wrongAnswers: any[] = [];
    let points = 0;
    for (const question of submitQuizDto.quiz) {
      const trueAnswer = await this.prismaService.answer.findFirst({
        where: { questionId: question.id },
      });
      if (question.answer === trueAnswer.optionId) {
        points++;
      } else {
        const wrongQuestion = await this.prismaService.question.findFirst({
          where: { id: question.id },
          select: { text: true },
        });
        const ans = await this.prismaService.option.findFirst({
          where: { id: trueAnswer.optionId },
          select: { text: true },
        });
        wrongAnswers.push({ question: wrongQuestion.text, answer: ans.text });
      }
      const markQuestionAsTaken = await this.prismaService.userQuestions.create(
        {
          data: {
            userId: id,
            questionId: question.id,
          },
        },
      );
    }
    const updatedUserDate = await this.prismaService.user.update({
      where: { id: id },
      data: { points: { increment: points } },
    });
    return { wrongAnswers, points };
  }

  async getQuiz(id: string) {
    const takenQuestions = await this.prismaService.userQuestions.findMany({
      where: { userId: id },
      select: { questionId: true },
    });
    const questionsIds: string[] = [];
    for (const question of takenQuestions) {
      questionsIds.push(question.questionId);
    }
    const quizQuestions = await this.prismaService.question.findMany({
      where: { NOT: { id: { in: questionsIds } } },
      take: 5,
    });
    if (quizQuestions.length < 5) {
      return { error: 'There is no enough questions' };
    }
    const quiz: any[] = [];
    for (const quest of quizQuestions) {
      const options = await this.prismaService.option.findMany({
        where: { questionId: quest.id },
        select: { text: true, id: true },
      });
      const randomedOptions = random_options(options);
      quiz.push({ quest, randomedOptions });
    }
    return { quizz: quiz };
  }
}
