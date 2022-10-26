import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateNotificationDto } from 'src/notifications/dto/create-notification.dto';
import { NotificationsService } from 'src/notifications/notifications.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';

@Injectable()
export class LikesService {
  constructor(
    private prisma: PrismaService,
    private notify: NotificationsService,
  ) {}
  async create(createLikeDto: CreateLikeDto) {
    try {
      const like = await this.prisma.like.create({
        data: {
          userId: createLikeDto.userId,
          postId: createLikeDto.postId,
        },
      });

      const createnotificationdto: CreateNotificationDto = {
        title: `${like.userId} Add like to post will create blog `,
        typeofNotification: `Add like `,
        typeId: like.postId,
        userId: like.userId,
        Seen: false,
      };
      this.notify.create(createnotificationdto);
      return like;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }

  async findAll() {
    return await this.prisma.like.findMany();
  }
  async findLikesForPost(id: string) {
    return await this.prisma.like.findMany({
      where: {
        postId: id,
      },
    });
  }
  async findLikesForUser(id: string) {
    return await this.prisma.like.findMany({
      where: {
        userId: id,
      },
    });
  }
  async findNumberLikesForPost(id: string) {
    return await this.prisma.like.count({
      where: {
        postId: id,
      },
    });
  }
  async remove(updateLikeDto: UpdateLikeDto) {
    try {
      await this.prisma.like.delete({
        where: {
          userId_postId: {
            postId: updateLikeDto.postId,
            userId: updateLikeDto.userId,
          },
        },
      });
      return `delete like from post ${updateLikeDto.postId}`;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
