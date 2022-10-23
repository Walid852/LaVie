import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { FacebookStrategy } from 'src/auth/facebook.strategy';

@Module({
  controllers: [UsersController],
  providers: [UsersService, FacebookStrategy],
})
export class UsersModule {}
