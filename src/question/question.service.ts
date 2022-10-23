import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
@Injectable()
export class QuestionService {
  constructor(private prismaService: PrismaService) {}

  // admin role
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

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} question`;
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }
}
