import { BadRequestException, Injectable } from '@nestjs/common';
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
    try {
      const blog = await this.prisma.blogs.create({
        data: {
          title: createBlogDto.Title,
          content: createBlogDto.Content,
          photoURL: createBlogDto.photoURL,
          userId: createBlogDto.userId,
        },
      });
      const createnotificationdto: CreateNotificationDto = {
        title: `will create blog ${blog.title}`,
        typeofNotification: `create blog `,
        typeId: blog.id,
        userId: blog.userId,
        Seen: false,
      };
      this.notify.create(createnotificationdto);

      return blog;
    } catch (error) {
      throw new BadRequestException();
    }
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

    if (!blog) throw new BadRequestException();
    return blog;
  }

  async update(id: string, updateBlogDto: UpdateBlogDto) {
    // save the new user in the db
    try {
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
      const createnotificationdto: CreateNotificationDto = {
        title: `will Update blog ${blog.title}`,
        typeofNotification: `Update blog `,
        typeId: blog.id,
        userId: blog.userId,
        Seen: false,
      };
      this.notify.create(createnotificationdto);
      return blog;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async remove(id: string) {
    try {
      const blog = await this.prisma.blogs.delete({
        where: {
          id: id,
        },
      });
      return `delete blog ${blog.id}`;
    } catch {
      throw new BadRequestException();
    }
  }
}
