import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import {
  ApiAcceptedResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Role } from 'src/enums/role.enum';
import { AuthService } from './auth.service';
import {
  AuthDto,
  AuthDtoSignIn,
  DataResponse,
  DataResponseSignIn,
} from './dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: DataResponse,
    isArray: true,
  })
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  @ApiAcceptedResponse({
    description: 'successfully LOgin in .',
    type: DataResponse,
    isArray: true,
  })
  signin(@Body() dto: AuthDtoSignIn) {
    return this.authService.signin(dto);
  }
  /*@Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
    return HttpStatus.OK;
  }*/

  @Post('google')
  @UseGuards(AuthGuard('google'))
  @ApiCreatedResponse({
    description: 'successfully Authanticate with google.',
    type: DataResponse,
    isArray: true,
  })
  googleAuthRedirect(@Req() req) {
    return this.authService.googleLogin(req);
  }
  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin(): Promise<any> {
    return HttpStatus.OK;
  }
  @Get('facebook/redirect')
  @UseGuards(AuthGuard('facebook'))
  async facebookLoginRedirect(@Req() req): Promise<any> {
    return {
      statusCode: HttpStatus.OK,
      data: req.user,
    };
  }
}
