import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}
  async create(createNotificationDto: CreateNotificationDto) {
    const notify = await this.prisma.notification.create({
      data: {
        title: createNotificationDto.title,
        userId: createNotificationDto.userId,
        typeofNotification: createNotificationDto.typeofNotification,
        typeId: createNotificationDto.typeId,
      },
    });
    return notify;
  }

  async findAll() {
    return await this.prisma.notification.findMany({
      where: {
        Seen: false,
      },
    });
  }

  findOne(id: string) {
    const notification = this.prisma.notification.findUnique({
      where: {
        id: id,
      },
    });
    return notification;
  }

  async update(id: string, updateNotificationDto: UpdateNotificationDto) {
    const notify = await this.prisma.notification.update({
      where: {
        id: id,
      },
      data: {
        title: updateNotificationDto.title,
        typeofNotification: updateNotificationDto.typeofNotification,
        typeId: updateNotificationDto.typeId,
      },
    });
    return notify;
  }

  async remove(id: string) {
    const notify = await this.prisma.notification.delete({
      where: {
        id: id,
      },
    });
    return `This action removes a #${notify.id} notification`;
  }
}
