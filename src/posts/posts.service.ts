import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}
  async create(createPostDto: CreatePostDto) {
    const post = await this.prisma.post.create({
      data: {
        title: createPostDto.title,
        content: createPostDto.content,
        Photo: createPostDto.Photo,
        userId: createPostDto.userId,
      },
    });
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
    return post;
  }

  async remove(id: string) {
    await this.prisma.post.delete({
      where: {
        id: id,
      },
    });

    return `deleted post`;
  }
}
