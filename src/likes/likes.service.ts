import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';

@Injectable()
export class LikesService {
  constructor(private prisma: PrismaService) {}
  async create(createLikeDto: CreateLikeDto) {
    const like = await this.prisma.like.create({
      data: {
        userId: createLikeDto.userId,
        postId: createLikeDto.postId,
      },
    });
    return like;
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
    await this.prisma.like.delete({
      where: {
        userId_postId: {
          postId: updateLikeDto.postId,
          userId: updateLikeDto.userId,
        },
      },
    });
    return `delete like from post ${updateLikeDto.postId}`;
  }
}
