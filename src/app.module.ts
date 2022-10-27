import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { FacebookStrategy } from './auth/facebook.strategy';
import { QuestionModule } from './question/question.module';
import { QuizService } from './quiz/quiz.service';
import { QuizController } from './quiz/quiz.controller';
import { QuizModule } from './quiz/quiz.module';
import { ProductModule } from './product/product.module';
import { FiltersModule } from './filters/filters.module';

import { CartModule } from './cart/cart.module';

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
    QuestionModule,
    QuizModule,
    ProductModule,
    FiltersModule,

    CartModule,

    BlogsModule,
    PostsModule,
    NotificationsModule,
    LikesModule,
    RepliesModule,
  ],
  providers: [PrismaService, QuizService],
  controllers: [QuizController],
})
export class AppModule {}
