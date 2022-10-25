import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from 'src/notifications/dto/create-notification.dto';
import { NotificationsService } from 'src/notifications/notifications.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
@Injectable()
export class BlogsService {
  constructor(
    private prisma: PrismaService,
    private notify: NotificationsService,
  ) {}
  async create(createBlogDto: CreateBlogDto) {
    const blog = await this.prisma.blogs.create({
      data: {
        title: createBlogDto.Title,
        content: createBlogDto.Content,
        photoURL: createBlogDto.photoURL,
        userId: createBlogDto.userId,
      },
    });
    let createnotificationdto: CreateNotificationDto;
    createnotificationdto.title = `${blog.userId} will create blog ${blog.title}`;
    createnotificationdto.typeofNotification = `create blog `;
    createnotificationdto.typeId = blog.id;
    createnotificationdto.userId = blog.userId;
    console.log('hello');
    this.notify.create(createnotificationdto);
    return blog;
  }
  async findAll() {
    const blogs = await this.prisma.blogs.findMany({
      select: {
        id: true,
        title: true,
        createdAt: true,
        content: true,
        userId: true,
        photoURL: true,
      },
    });
    return blogs;
  }
  async MyBlogs(id: string) {
    const blogs = await this.prisma.blogs.findMany({
      where: {
        userId: id,
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        content: true,
        userId: true,
        photoURL: true,
      },
    });
    return blogs;
  }

  async findOne(id: string) {
    const blog = await this.prisma.blogs.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        content: true,
        userId: true,
        photoURL: true,
      },
    });
    return blog;
  }

  async update(id: string, updateBlogDto: UpdateBlogDto) {
    // save the new user in the db
    const blog = await this.prisma.blogs.update({
      where: {
        id: id,
      },
      data: {
        title: updateBlogDto.Title,
        content: updateBlogDto.Content,
        photoURL: updateBlogDto.photoURL,
      },
    });
    return blog;
  }

  async remove(id: string) {
    const blog = await this.prisma.blogs.delete({
      where: {
        id: id,
      },
    });
    return blog;
  }
}
