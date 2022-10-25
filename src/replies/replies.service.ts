import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReplyDto } from './dto/create-reply.dto';
import { UpdateReplyDto } from './dto/update-reply.dto';

@Injectable()
export class RepliesService {
  constructor(private prisma: PrismaService) {}
  async create(createReplyDto: CreateReplyDto) {
    return await this.prisma.reply.create({
      data: {
        userID: createReplyDto.userId,
        postId: createReplyDto.postId,
        content: createReplyDto.content,
      },
    });
  }

  findAll() {
    return this.prisma.reply.findMany();
  }
  async findRepliesForPost(id: string) {
    return await this.prisma.reply.findMany({
      where: {
        postId: id,
      },
    });
  }
  async findReplisForUser(id: string) {
    return await this.prisma.reply.findMany({
      where: {
        userID: id,
      },
    });
  }
  async findNumberRepliesForPost(id: string) {
    return await this.prisma.reply.count({
      where: {
        postId: id,
      },
    });
  }
  async findOne(id: string) {
    return await this.prisma.reply.findUnique({
      where: {
        id: id,
      },
    });
  }
  async update(id: string, updateReplyDto: UpdateReplyDto) {
    return await this.prisma.reply.update({
      where: {
        id: id,
      },
      data: {
        content: updateReplyDto.content,
      },
    });
  }

  async remove(id: string) {
    await this.prisma.reply.delete({
      where: {
        id: id,
      },
    });
    return `This action removes a #${id} reply`;
  }
}
