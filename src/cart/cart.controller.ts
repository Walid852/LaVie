import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { CartService } from './cart.service';
@UseGuards(JwtGuard)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  findAll(@Request() req) {
    const user = req.user;
    return this.cartService.findAll(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.cartService.add(req.user.id, id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.cartService.remove(id, req.user.id);
  }
}
