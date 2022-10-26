import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateNotificationDto } from 'src/notifications/dto/create-notification.dto';
import { NotificationsService } from 'src/notifications/notifications.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReplyDto } from './dto/create-reply.dto';
import { UpdateReplyDto } from './dto/update-reply.dto';

@Injectable()
export class RepliesService {
  constructor(
    private prisma: PrismaService,
    private notify: NotificationsService,
  ) {}
  async create(createReplyDto: CreateReplyDto) {
    try {
      const reply = await this.prisma.reply.create({
        data: {
          userID: createReplyDto.userId,
          postId: createReplyDto.postId,
          content: createReplyDto.content,
        },
      });

      const createnotificationdto: CreateNotificationDto = {
        title: `${reply.userID} Add Reply to post ${reply.postId} this content ${reply.content} `,
        typeofNotification: `Add Reply `,
        typeId: reply.id,
        userId: reply.userID,
        Seen: false,
      };
      this.notify.create(createnotificationdto);
      return reply;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  findAll() {
    return this.prisma.reply.findMany();
  }
  async findRepliesForPost(id: string) {
    const replies = await this.prisma.reply.findMany({
      where: {
        postId: id,
      },
    });
    return replies;
  }
  async findReplisForUser(id: string) {
    const replies = await this.prisma.reply.findMany({
      where: {
        userID: id,
      },
    });
    return replies;
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
    try {
      return await this.prisma.reply.update({
        where: {
          id: id,
        },
        data: {
          content: updateReplyDto.content,
        },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.reply.delete({
        where: {
          id: id,
        },
      });
      return `This action removes a #${id} reply`;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
