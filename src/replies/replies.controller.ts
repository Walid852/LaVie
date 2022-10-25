import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { RepliesService } from './replies.service';
import { CreateReplyDto } from './dto/create-reply.dto';
import { UpdateReplyDto } from './dto/update-reply.dto';
import { JwtGuard } from 'src/auth/guard';
import { User } from '@prisma/client';
@UseGuards(JwtGuard)
@Controller('replies')
export class RepliesController {
  constructor(private readonly repliesService: RepliesService) {}

  @Post()
  create(@Body() createReplyDto: CreateReplyDto, @Request() req) {
    const user: User = req.user;
    createReplyDto.userId = user.id;
    return this.repliesService.create(createReplyDto);
  }

  @Get()
  findAll() {
    return this.repliesService.findAll();
  }
  @Get('findRepliesForPost/:id')
  findRepliesForPost(id: string) {
    return this.repliesService.findRepliesForPost(id);
  }
  @Get('findReplisForUser/:id')
  findReplisForUser(id: string) {
    return this.repliesService.findReplisForUser(id);
  }
  @Get('findNumberRepliesForPost/:id')
  findNumberRepliesForPost(id: string) {
    return this.repliesService.findNumberRepliesForPost(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.repliesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReplyDto: UpdateReplyDto) {
    return this.repliesService.update(id, updateReplyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.repliesService.remove(id);
  }
}
