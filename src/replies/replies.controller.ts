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
import { CreateReplyDto, ReplyResponse } from './dto/create-reply.dto';
import { UpdateReplyDto } from './dto/update-reply.dto';
import { JwtGuard } from 'src/auth/guard';
import { User } from '@prisma/client';
import { ApiAcceptedResponse, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@ApiTags('replies')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('replies')
export class RepliesController {
  constructor(private readonly repliesService: RepliesService) {}

  @Post()
  @ApiAcceptedResponse({
    description: ' create replay successfully',
    type: ReplyResponse,
  })
  create(@Body() createReplyDto: CreateReplyDto, @Request() req) {
    const user: User = req.user;
    createReplyDto.userId = user.id;
    return this.repliesService.create(createReplyDto);
  }

  @Get()
  @ApiAcceptedResponse({
    description: ' All replies successfully',
    type: [ReplyResponse],
  })
  findAll() {
    return this.repliesService.findAll();
  }
  @Get('findRepliesForPost/:id')
  @ApiAcceptedResponse({
    description: ' find replaies for post successfully',
    type: ReplyResponse,
  })
  findRepliesForPost(@Param('id') id: string) {
    return this.repliesService.findRepliesForPost(id);
  }
  @Get('findReplisForUser/:id')
  @ApiAcceptedResponse({
    description: ' find replaies for User successfully',
    type: ReplyResponse,
  })
  findReplisForUser(@Param('id') id: string) {
    return this.repliesService.findReplisForUser(id);
  }
  @Get('findNumberRepliesForPost/:id')
  @ApiAcceptedResponse({
    description: ' number replaies for post successfully',
    type: ReplyResponse,
  })
  findNumberRepliesForPost(@Param('id') id: string) {
    return this.repliesService.findNumberRepliesForPost(id);
  }

  @Get(':id')
  @ApiAcceptedResponse({
    description: ' finnd reply for post successfully',
    type: ReplyResponse,
  })
  findOne(@Param('id') id: string) {
    return this.repliesService.findOne(id);
  }

  @Patch(':id')
  @ApiAcceptedResponse({
    description: ' find replies for post successfully',
    type: ReplyResponse,
  })
  update(@Param('id') id: string, @Body() updateReplyDto: UpdateReplyDto) {
    return this.repliesService.update(id, updateReplyDto);
  }

  @Delete(':id')
  @ApiAcceptedResponse({
    description: ' delete reply for post successfully',
    type: ReplyResponse,
  })
  remove(@Param('id') id: string) {
    return this.repliesService.remove(id);
  }
}
