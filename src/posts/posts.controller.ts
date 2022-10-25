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
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtGuard } from 'src/auth/guard';
import { User } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import path = require('path');
import { v4 as uuidv4 } from 'uuid';
import { diskStorage } from 'multer';
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
@UseGuards(JwtGuard)
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', storage))
  create(
    @Body() createPostDto: CreatePostDto,
    @UploadedFile() file,
    @Request() req,
  ) {
    const user: User = req.user;
    createPostDto.userId = user.id;
    createPostDto.Photo = file.path;
    console.log(createPostDto);
    return this.postsService.create(createPostDto);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }
  @Get('Myposts')
  Myposts(@Request() req) {
    const user = req.user;
    return this.postsService.myPosts(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file', storage))
  update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @UploadedFile() file,
  ) {
    if (file != undefined) {
      updatePostDto.Photo = file.path;
    } else {
      updatePostDto.Photo = '';
    }
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.postsService.remove(id);
    return `Post ${id} delted`;
  }
}
