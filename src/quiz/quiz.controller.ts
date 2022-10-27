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
import { GetQuiz, Result, SubmitQuizDto } from './dto/create-quiz.dto';
import { JwtGuard } from 'src/auth/guard';
import {
  ApiAcceptedResponse,
  ApiBearerAuth,
  ApiBody,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
@UseGuards(JwtGuard)
@ApiTags('Quiz')
@ApiBearerAuth()
@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}
  @ApiBody({ type: SubmitQuizDto })
  @ApiAcceptedResponse({ type: Result })
  @Post()
  submit(@Body() submitQuizDto: SubmitQuizDto, @Request() req) {
    const userId = req.user.id;
    return this.quizService.submit(submitQuizDto, userId);
  }
  @ApiResponse({ type: GetQuiz })
  @Get()
  getQuiz(@Request() req) {
    const userId = req.user.id;
    return this.quizService.getQuiz(userId);
  }
}
