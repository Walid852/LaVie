import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
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
  }

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
    const user = await this.prisma.user.findMany({
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
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const hash = await argon.hash(updateUserDto.password.toString());
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
    const user = await this.prisma.user.delete({
      where: {
        id: id,
      },
    });
    return user;
  }
}
