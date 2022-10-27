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
  Res,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, FileUploadDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from 'src/auth/guard';
import { Roles } from 'src/enums/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { RolesGuard } from 'src/enums/roles.guard';
import { User } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import { Observable, of } from 'rxjs';
import path = require('path');
import { join } from 'path';
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
    destination: './uploads/profileimages',
    filename: (req, file, cb) => {
      const filename: string =
        path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /*@Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }*/

  @UseGuards(JwtGuard)
  @Get()
  @ApiAcceptedResponse({
    description: 'Find all users',
    type: CreateUserDto,
    isArray: true,
  })
  findAll(@Request() req) {
    const user: User = req.user;
    console.log(user);
    return this.usersService.findAll();
  }
  @ApiAcceptedResponse({
    description: 'Find spesific User.',
    type: UpdateUserDto,
    isArray: true,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    const user = this.usersService.findOne(id);
    if (!user) throw new BadRequestException('wrong id');
    return user;
  }

  @Patch()
  @ApiAcceptedResponse({
    description: 'Update current user',
    type: UpdateUserDto,
  })
  update(@Body() updateUserDto: UpdateUserDto, @Request() req) {
    const user: User = req.user;
    updateUserDto.points = user.points;
    if (updateUserDto.password == null) updateUserDto.password = user.Password;
    console.log(updateUserDto);
    return this.usersService.update(user.id, updateUserDto);
  }

  @Post('uploadImage')
  @UseInterceptors(FileInterceptor('file', storage))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'List of cats',
    type: FileUploadDto,
  })
  @ApiAcceptedResponse({
    description: 'Update current user',
    type: UpdateUserDto,
    isArray: true,
  })
  uploadFile(@UploadedFile() file, @Request() req): Promise<UpdateUserDto> {
    const user: User = req.user;

    return this.usersService.updatePhoto(user.id, file.path);
  }

  @ApiAcceptedResponse({
    description: 'delete spesific User.',
    type: String,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.usersService.remove(id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
