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
  UseInterceptors,
  UploadedFile,
  UnauthorizedException,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto, PostResponse } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtGuard } from 'src/auth/guard';
import { User } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import path = require('path');
import { v4 as uuidv4 } from 'uuid';
import { diskStorage } from 'multer';
import {
  ApiAcceptedResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiTags,
} from '@nestjs/swagger';
export const storage = {
  storage: diskStorage({
    destination: './uploads/Postimages',
    filename: (req, file, cb) => {
      const filename: string =
        path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};
@ApiTags('posts')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', storage))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create Post',
    type: CreatePostDto,
  })
  @ApiAcceptedResponse({
    description: ' create Post successfully',
    type: PostResponse,
    isArray: true,
  })
  create(
    @Body() createPostDto: CreatePostDto,
    @UploadedFile() file,
    @Request() req,
  ) {
    const user: User = req.user;
    createPostDto.userId = user.id;
    if (file != undefined) {
      createPostDto.Photo = file.path;
    } else {
      createPostDto.Photo = '';
    }
    console.log(createPostDto);
    return this.postsService.create(createPostDto);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }
  @Get('Myposts')
  @ApiAcceptedResponse({
    description: ' My posts',
    type: PostResponse,
  })
  Myposts(@Request() req) {
    const user = req.user;
    console.log(user);
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.postsService.myPosts(user.id);
  }

  @Get(':id')
  @ApiAcceptedResponse({
    description: ' single Post',
    type: PostResponse,
    isArray: true,
  })
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file', storage))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'update Post',
    type: CreatePostDto,
  })
  @ApiAcceptedResponse({
    description: ' update Post successfully',
    type: PostResponse,
    isArray: true,
  })
  update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @UploadedFile() file,
  ) {
    if (file != undefined) {
      updatePostDto.Photo = file.path;
    }
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  @ApiAcceptedResponse({
    description: ' delete Post successfully',
    type: String,
  })
  remove(@Param('id') id: string) {
    this.postsService.remove(id);
    return `Post ${id} delted and all likes and replies`;
  }
}
