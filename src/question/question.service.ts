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
    console.log(createQuestionDto.options);
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
    return { question, options, answer };
  }

  findAll() {
    return `This action returns all question`;
  }

  findOne(id: number) {
    return `This action returns a #${id} question`;
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
    const deletedAnswer = await this.prismaService.answer.delete({
      where: {
        questionId_optionId: { questionId: id, optionId: oldAnswer.optionId },
      },
    });
    const updatedAnswer = await this.prismaService.answer.create({
      data: {
        questionId: id,
        optionId: options[0].id,
      },
    });

    return { updatedQuestion, options, updatedAnswer };
  }
  // ADMIN ROLE
  async remove(id: string) {
    const { optionId } = await this.prismaService.answer.findFirst({
      where: { questionId: id },
    });
    const deletedAnswer = await this.prismaService.answer.deleteMany({
      where: { questionId: id },
    });

    console.log('doneeeeee');
    const deletedOptions = await this.prismaService.option.deleteMany({
      where: { questionId: id },
    });
    const deletedQuestion = await this.prismaService.question.delete({
      where: { id: id },
    });
    return `Qestion deleted successfully`;
  }
}
