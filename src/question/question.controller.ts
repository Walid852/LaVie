import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Req,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import {
  CreatedQuestion,
  CreateQuestionDto,
  DeletedQuestions,
  GetQuesiton,
  GetQuestions,
} from './dto/create-question.dto';
import { UpdatedQuestion, UpdateQuestionDto } from './dto/update-question.dto';
import { JwtGuard } from 'src/auth/guard';
import {
  ApiAcceptedResponse,
  ApiBearerAuth,
  ApiBody,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
// @UseGuards(JwtGuard)
@ApiTags('Qestions')
@ApiBearerAuth()
@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}
  @ApiBody({ description: 'Adding question', type: CreateQuestionDto })
  @ApiAcceptedResponse({ description: 'question added', type: CreatedQuestion })
  @Post()
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionService.create(createQuestionDto);
  }

  @ApiResponse({ description: 'Get all quesions', type: GetQuestions })
  @Get()
  findAll(@Query('p') p: number) {
    return this.questionService.findAll(p);
  }
  @ApiResponse({ description: 'Get specific question', type: GetQuesiton })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionService.findOne(id);
  }
  @ApiBody({ description: 'Update Question', type: CreateQuestionDto })
  @ApiAcceptedResponse({ type: UpdatedQuestion })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.questionService.update(id, updateQuestionDto);
  }
  @ApiAcceptedResponse({ type: DeletedQuestions })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionService.remove(id);
  }
}
