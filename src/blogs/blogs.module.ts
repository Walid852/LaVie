import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { NotificationsService } from 'src/notifications/notifications.service';

@Module({
  controllers: [BlogsController],
  providers: [BlogsService, NotificationsService],
})
export class BlogsModule {}
