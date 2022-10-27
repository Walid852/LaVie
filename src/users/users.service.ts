import {
  BadRequestException,
  ForbiddenException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  /*async create(createUserDto: CreateUserDto) {
    const hash = await argon.hash(createUserDto.password);
    // save the new user in the db
    const user = await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        Password: hash,
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        points: 0,
        address: '',
        profilePic: '',
      },
    });
    return user;
  }*/

  async findAll() {
    const users = await this.prisma.user.findMany({
      select: {
        email: true,
        firstName: true,
        lastName: true,
        profilePic: true,
        address: true,
        points: true,
      },
    });
    return users;
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        email: true,
        firstName: true,
        lastName: true,
        profilePic: true,
        address: true,
        points: true,
      },
    });
    if (!user) throw new BadRequestException();
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    let hash;
    if (updateUserDto.password != undefined) {
      hash = await argon.hash(updateUserDto.password.toString());
    }
    const currentUser = this.findOne(id);
    if ((await currentUser).email != updateUserDto.email) {
      const temp = this.prisma.user.findUnique({
        where: { email: updateUserDto.email },
      });
      if (temp) {
        throw new BadRequestException('email founded');
      }
    }
    const user = await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        Password: hash,
        firstName: updateUserDto.firstName,
        lastName: updateUserDto.lastName,
        address: updateUserDto.Address,
        email: updateUserDto.email,
        points: updateUserDto.points,
      },
      select: {
        email: true,
        firstName: true,
        lastName: true,
        profilePic: true,
        address: true,
        points: true,
      },
    });
    return user;
  }
  async updatePhoto(id: string, image: string) {
    const user = await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        profilePic: image,
      },
      select: {
        email: true,
        firstName: true,
        lastName: true,
        points: true,
        profilePic: true,
        address: true,
        createdAt: true,
      },
    });
    return user;
  }

  async remove(id: string) {
    /*try {

      await this.prisma.notification.deleteMany({
        where: {
          userId: id,
        },
      });
      const posts = await this.prisma.post.findMany({
        where: {
          userId: id,
        },
      });
      console.log(posts);

      const reply = this.prisma.reply.deleteMany({
        where: {
          postId: '82598a31-5e0d-4cd1-953f-b805e1ceb88a',
        },
      });
      const like = this.prisma.like.deleteMany({
        where: {
          postId: '82598a31-5e0d-4cd1-953f-b805e1ceb88a',
        },
      });
      console.log(reply);
      console.log(like);

      console.log(1);
      await this.prisma.like.deleteMany({
        where: {
          userId: id,
        },
      });
      console.log(2);
      await this.prisma.reply.deleteMany({
        where: {
          userID: id,
        },
      });
      console.log(3);

      await this.prisma.post.deleteMany({
        where: {
          userId: id,
        },
      });
      console.log(5);
      await this.prisma.blogs.deleteMany({
        where: {
          userId: id,
        },
      });
      console.log(6);
      await this.prisma.user.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
    return `delete user ${id} and all activities `;
  }*/
    const update = await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        Notification: {
          deleteMany: {
            userId: id,
          },
        },
        Blogs: {
          deleteMany: {
            userId: id,
          },
        },
        Reply: {
          deleteMany: {
            userID: id,
          },
        },
        Like: {
          deleteMany: {
            userId: id,
          },
        },
        Post: {
          deleteMany: {
            userId: id,
          },
        },
      },
    });

    return 'deleted';
  }
}
