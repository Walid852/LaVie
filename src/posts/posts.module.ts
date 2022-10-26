import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { NotificationsService } from 'src/notifications/notifications.service';

@Module({
  controllers: [PostsController],
  providers: [PostsService, NotificationsService],
})
export class PostsModule {}
