import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { JwtGuard } from 'src/auth/guard';
import { User } from '@prisma/client';
@UseGuards(JwtGuard)
@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post()
  create(@Body() createLikeDto: CreateLikeDto, @Request() req) {
    const user: User = req.user;
    createLikeDto.userId = user.id;
    return this.likesService.create(createLikeDto);
  }

  @Get()
  findAll() {
    return this.likesService.findAll();
  }
  @Get('findLikesForPost/:id')
  findLikesForPost(@Param('id') id: string) {
    return this.likesService.findLikesForPost(id);
  }
  @Get('findLikesForUser/:id')
  findLikesForUser(@Param('id') id: string) {
    return this.likesService.findLikesForUser(id);
  }
  @Get('findNumberLikesForPost/:id')
  findNumberLikesForPost(@Param('id') id: string) {
    return this.likesService.findNumberLikesForPost(id);
  }

  @Delete()
  remove(@Body() updateLikeDto: UpdateLikeDto, @Request() req) {
    const user: User = req.user;
    updateLikeDto.userId = user.id;
    console.log(updateLikeDto);
    return this.likesService.remove(updateLikeDto);
  }
}
