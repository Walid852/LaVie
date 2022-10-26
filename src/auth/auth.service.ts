import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto, AuthDtoSignIn, DataResponse } from './dto';
import * as argon from 'argon2';

import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: AuthDto) {
    const hash = await argon.hash(dto.password);
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          Password: hash,
          firstName: dto.firstName,
          lastName: dto.lastName,
          points: 0,
          address: '',
          profilePic: '',
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          points: true,
          profilePic: true,
          address: true,
          createdAt: true,
        },
      });
      console.log(user);
      const res: DataResponse = {
        accessToken: (await this.signToken(user.id, user.email)).access_token,
        user: user,
      };
      return res;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw new BadRequestException('missing');
    }
  }
  async signin(dto: AuthDtoSignIn) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) throw new ForbiddenException('Credentials incorrect');
    const pwMatches = await argon.verify(user.Password, dto.password);
    if (!pwMatches) throw new ForbiddenException('Credentials incorrect');
    return this.signToken(user.id, user.email);
  }
  async signToken(
    userId: string,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '35m',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }
  googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }

    return {
      message: 'User information from google',
      user: req.user,
    };
  }
}
