import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionService {
  constructor(private prismaService: PrismaService) {}

  // ADMIN ROLE
  async create(createQuestionDto: CreateQuestionDto) {
    const question = await this.prismaService.question.create({
      data: { text: createQuestionDto.question },
    });
    const options: { text: string; questionId: string; id: string }[] = [];
    for (const opt of createQuestionDto.options) {
      const createdOption = await this.prismaService.option.create({
        data: { text: opt, questionId: question.id },
      });
      options.push(createdOption);
    }

    // answer will be always at index zero in the array (should be matched with the front developer)
    const answer = await this.prismaService.answer.create({
      data: { questionId: question.id, optionId: options[0].id },
    });
    return { question, options, answer: createQuestionDto.options[0] };
  }
  // ADMIN ROLE
  async findAll(page: number) {
    //pagination
    if (!page) page = 1;
    const limit = 20;
    const skip = (page - 1) * limit;
    const questions = await this.prismaService.question.findMany({
      skip: skip,
      take: limit,
    });
    const questionsAndOptions: any[] = [];
    for (const question of questions) {
      const options = await this.prismaService.option.findMany({
        where: { questionId: question.id },
        select: { text: true, id: true },
      });
      questionsAndOptions.push({ question, options });
    }
    return { questionsAndOptions };
  }
  // ADMIN ROLE
  async findOne(id: string) {
    const question = await this.prismaService.question.findUnique({
      where: { id: id },
    });
    const options = await this.prismaService.option.findMany({
      where: { questionId: id },
      select: { text: true, id: true },
    });
    return { question, options };
  }

  async update(id: string, updateQuestionDto: UpdateQuestionDto) {
    const updatedQuestion = await this.prismaService.question.update({
      where: { id: id },
      data: {
        text: updateQuestionDto.question,
      },
    });
    const options: any[] = [];
    const deletedOptions = await this.prismaService.option.deleteMany({
      where: { questionId: id },
    });
    for (const opt of updateQuestionDto.options) {
      const newOption = await this.prismaService.option.create({
        data: { questionId: id, text: opt },
      });
      options.push(newOption);
    }
    const oldAnswer = await this.prismaService.answer.findFirst({
      where: { questionId: id },
    });
    const updatedAnswer = await this.prismaService.answer.update({
      where: { questionId: id },
      data: {
        optionId: options[0].id,
      },
    });

    return {
      updatedQuestion,
      options,
      updatedAnswer: updateQuestionDto.options[0],
    };
  }
  // ADMIN ROLE
  async remove(id: string) {
    const deletedAnswer = await this.prismaService.answer.delete({
      where: { questionId: id },
    });
    const deletedOptions = await this.prismaService.option.deleteMany({
      where: { questionId: id },
    });
    const deletedQuestion = await this.prismaService.question.delete({
      where: { id: id },
    });
    return { message: `Qestion deleted successfully` };
  }
}
