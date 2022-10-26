import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from 'src/notifications/dto/create-notification.dto';
import { NotificationsService } from 'src/notifications/notifications.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    private prisma: PrismaService,
    private notify: NotificationsService,
  ) {}
  async create(createPostDto: CreatePostDto) {
    const post = await this.prisma.post.create({
      data: {
        title: createPostDto.title,
        content: createPostDto.content,
        Photo: createPostDto.Photo,
        userId: createPostDto.userId,
      },
    });
    const createnotificationdto: CreateNotificationDto = {
      title: `will create Post ${post.title}`,
      typeofNotification: `create Post `,
      typeId: post.id,
      userId: post.userId,
      Seen: false,
    };
    this.notify.create(createnotificationdto);
    return post;
  }

  async findAll() {
    const posts = await this.prisma.post.findMany();
    return posts;
  }
  async myPosts(id: string) {
    const posts = await this.prisma.post.findMany({
      where: {
        userId: id,
      },
    });
    console.log(posts);
    return posts;
  }

  async findOne(id: string) {
    const post = await this.prisma.post.findUnique({
      where: {
        id: id,
      },
    });
    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    const post = await this.prisma.post.update({
      where: {
        id: id,
      },
      data: {
        title: updatePostDto.title,
        content: updatePostDto.content,
        Photo: updatePostDto.Photo,
      },
    });
    const createnotificationdto: CreateNotificationDto = {
      title: `will create Post ${post.title}`,
      typeofNotification: `create Post `,
      typeId: post.id,
      userId: post.userId,
      Seen: false,
    };
    this.notify.create(createnotificationdto);

    return post;
  }

  async remove(id: string) {
    const post = await this.prisma.post.findUnique({
      where: {
        id: id,
      },
    });
    await this.prisma.like.deleteMany({
      where: {
        postId: post.id,
      },
    });
    await this.prisma.reply.deleteMany({
      where: {
        postId: post.id,
      },
    });
    await this.prisma.post.delete({
      where: {
        id: id,
      },
    });

    return `deleted post`;
  }
}
