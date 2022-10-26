import { Module } from '@nestjs/common';
import { RepliesService } from './replies.service';
import { RepliesController } from './replies.controller';
import { NotificationsService } from 'src/notifications/notifications.service';

@Module({
  controllers: [RepliesController],
  providers: [RepliesService, NotificationsService],
})
export class RepliesModule {}
