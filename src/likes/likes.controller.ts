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
import { CreateLikeDto, LikeResponse } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { JwtGuard } from 'src/auth/guard';
import { User } from '@prisma/client';
import { ApiAcceptedResponse, ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('likes')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post()
  @ApiAcceptedResponse({
    description: ' create Like successfully',
    type: LikeResponse,
  })
  create(@Body() createLikeDto: CreateLikeDto, @Request() req) {
    const user: User = req.user;
    createLikeDto.userId = user.id;
    return this.likesService.create(createLikeDto);
  }

  @Get()
  @ApiAcceptedResponse({
    description: ' All Likes successfully',
    type: [LikeResponse],
  })
  findAll() {
    return this.likesService.findAll();
  }
  @Get('findLikesForPost/:id')
  @ApiAcceptedResponse({
    description: ' find Likes For Post successfully',
    type: [LikeResponse],
  })
  findLikesForPost(@Param('id') id: string) {
    return this.likesService.findLikesForPost(id);
  }
  @Get('findLikesForUser/:id')
  @ApiAcceptedResponse({
    description: ' find Likes For User successfully',
    type: [LikeResponse],
  })
  findLikesForUser(@Param('id') id: string) {
    return this.likesService.findLikesForUser(id);
  }
  @Get('findNumberLikesForPost/:id')
  @ApiAcceptedResponse({
    description: ' Numbers Likes For Post successfully',
    type: Number,
  })
  findNumberLikesForPost(@Param('id') id: string) {
    return this.likesService.findNumberLikesForPost(id);
  }

  @Delete()
  @ApiAcceptedResponse({
    description: ' delete Like For Post successfully',
    type: String,
  })
  remove(@Body() updateLikeDto: UpdateLikeDto, @Request() req) {
    const user: User = req.user;
    updateLikeDto.userId = user.id;
    console.log(updateLikeDto);
    return this.likesService.remove(updateLikeDto);
  }
}
