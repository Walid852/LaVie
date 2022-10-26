import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { FacebookStrategy } from 'src/auth/facebook.strategy';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/enums/roles.guard';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    RolesGuard,
    FacebookStrategy,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class UsersModule {}
