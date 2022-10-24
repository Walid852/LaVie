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
  ],
  providers: [PrismaService, QuizService],
  controllers: [QuizController],
})
export class AppModule {}
