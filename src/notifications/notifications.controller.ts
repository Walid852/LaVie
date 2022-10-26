import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import {
  CreateNotificationDto,
  NotificationResponse,
} from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { JwtGuard } from 'src/auth/guard';
import { User, Notification } from '@prisma/client';

import { ApiAcceptedResponse, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@ApiTags('notifications')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  @ApiAcceptedResponse({
    description: ' create Notification successfully',
    type: NotificationResponse,
  })
  create(@Body() createNotificationDto: CreateNotificationDto, @Request() req) {
    const user: User = req.user;
    createNotificationDto.userId = user.id;
    return this.notificationsService.create(createNotificationDto);
  }

  @Get()
  @ApiAcceptedResponse({
    description: ' All Notifications successfully',
    type: NotificationResponse,
  })
  findAll() {
    return this.notificationsService.findAll();
  }

  @Get(':id')
  @ApiAcceptedResponse({
    description: ' find single Notification successfully',
    type: NotificationResponse,
  })
  findOne(@Param('id') id: string) {
    return this.notificationsService.findOne(id);
  }

  @Patch(':id')
  @ApiAcceptedResponse({
    description: ' Update single Notification successfully',
    type: NotificationResponse,
  })
  update(
    @Param('id') id: string,
    @Body() updateNotificationDto: UpdateNotificationDto,
  ) {
    return this.notificationsService.update(id, updateNotificationDto);
  }

  @Delete(':id')
  @ApiAcceptedResponse({
    description: ' delete single Notification successfully',
    type: String,
  })
  remove(@Param('id') id: string) {
    return this.notificationsService.remove(id);
  }
}
