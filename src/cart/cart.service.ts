import { Injectable } from '@nestjs/common';
import { use } from 'passport';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CartService {
  constructor(private prismaService: PrismaService) {}
  async findAll(id: string) {
    const products = await this.prismaService.userCart.findMany({
      where: { userId: id },
    });
    return products;
  }

  async add(userId: string, productId: string) {
    const product = await this.prismaService.userCart.create({
      data: { userId: userId, productId: productId },
    });
    return { message: 'product added successfully' };
  }

  async remove(id: string, userId) {
    const removedProduct = await this.prismaService.userCart.delete({
      where: { userId_productId: { userId: userId, productId: id } },
    });
    return removedProduct;
  }
}
