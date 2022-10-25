import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

import { BlogsModule } from './blogs/blogs.module';
import { PostsModule } from './posts/posts.module';
import { NotificationsModule } from './notifications/notifications.module';
import { LikesModule } from './likes/likes.module';
import { RepliesModule } from './replies/replies.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    PrismaModule,
    BlogsModule,
    PostsModule,
    NotificationsModule,
    LikesModule,
    RepliesModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
