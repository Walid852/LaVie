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
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard';
import { CartService } from './cart.service';
import { AddedProduct, Deleted, GetAllProducts } from './dto/createdto';
@UseGuards(JwtGuard)
@ApiTags('User Cart')
@ApiBearerAuth()
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}
  @ApiResponse({ type: GetAllProducts })
  @Get()
  findAll(@Request() req) {
    const user = req.user;
    return this.cartService.findAll(user.id);
  }
  // add product to the user
  @ApiResponse({ type: AddedProduct })
  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.cartService.add(req.user.id, id);
  }
  @ApiResponse({ type: Deleted })
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.cartService.remove(id, req.user.id);
  }
}
