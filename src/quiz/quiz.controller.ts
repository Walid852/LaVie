import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Patch,
  Request,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { QuizService } from './quiz.service';
import { SubmitQuizDto } from './dto/create-quiz.dto';
import { JwtGuard } from 'src/auth/guard';
@UseGuards(JwtGuard)
@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}
  // USER ROLE
  @Post()
  submit(@Body() submitQuizDto: SubmitQuizDto) {
    const userId = '55e4be82-13f7-4332-b01f-8f5a6c2c5118';
    return this.quizService.submit(submitQuizDto, userId);
  }
  // USER ROLE
  @Get()
  getQuiz(@Request() req) {
    const userId = '55e4be82-13f7-4332-b01f-8f5a6c2c5118';
    return this.quizService.getQuiz(userId);
  }
}
