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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { JwtGuard } from 'src/auth/guard';
import { BlogsService } from './blogs.service';
import { BlogResponse, CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
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
import { FileUploadDto } from 'src/users/dto/create-user.dto';
export const storage = {
  storage: diskStorage({
    destination: './uploads/Blogimages',
    filename: (req, file, cb) => {
      const filename: string =
        path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = path.parse(file.originalname).ext;
      cb(null, `${filename}${extension}`);
    },
  }),
};
@ApiTags('blogs')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', storage))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create blog',
    type: CreateBlogDto,
  })
  @ApiAcceptedResponse({
    description: ' create Blog successfully',
    type: BlogResponse,
    isArray: true,
  })
  create(
    @Body() createBlogDto: CreateBlogDto,
    @UploadedFile() file,
    @Request() req,
  ) {
    const user: User = req.user;
    createBlogDto.userId = user.id;
    if (file != undefined) {
      createBlogDto.photoURL = file.path;
    } else {
      createBlogDto.photoURL = '';
    }
    return this.blogsService.create(createBlogDto);
  }

  @Get()
  @ApiAcceptedResponse({
    description: ' All Blogs',
    type: BlogResponse,
  })
  findAll() {
    return this.blogsService.findAll();
  }
  @Get('MyBlogs')
  @ApiAcceptedResponse({
    description: ' My Blogs',
    type: BlogResponse,
  })
  MyBlogs(@Request() req) {
    const user: User = req.user;
    return this.blogsService.MyBlogs(user.id);
  }

  @Get(':id')
  @ApiAcceptedResponse({
    description: ' single Blog',
    type: BlogResponse,
  })
  findOne(@Param('id') id: string) {
    return this.blogsService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file', storage))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create blog',
    type: CreateBlogDto,
  })
  @ApiAcceptedResponse({
    description: ' create Blog successfully',
    type: BlogResponse,
    isArray: true,
  })
  update(
    @Param('id') id: string,
    @Body() updateBlogDto: UpdateBlogDto,
    @UploadedFile() file,
  ) {
    if (file != undefined) {
      updateBlogDto.photoURL = file.path;
    } else {
      updateBlogDto.photoURL = '';
    }
    return this.blogsService.update(id, updateBlogDto);
  }

  @Delete(':id')
  @ApiAcceptedResponse({
    description: ' All Blogs',
    type: String,
  })
  remove(@Param('id') id: string) {
    return this.blogsService.remove(id);
  }
}
