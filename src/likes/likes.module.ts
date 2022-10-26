import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { NotificationsService } from 'src/notifications/notifications.service';

@Module({
  controllers: [LikesController],
  providers: [LikesService, NotificationsService],
})
export class LikesModule {}
