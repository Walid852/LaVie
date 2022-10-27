import { Injectable } from '@nestjs/common';
import { use } from 'passport';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CartService {
  constructor(private prismaService: PrismaService) {}
  async findAll(id: string) {
    const productsIds = await this.prismaService.userCart.findMany({
      where: { userId: id },
    });
    const products: any[] = [];
    for (const prod of productsIds) {
      const product = await this.prismaService.products.findUnique({
        where: { id: prod.productId },
      });
      products.push(product);
    }
    return { products };
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
    return { message: 'Product removed from cart' };
  }
}
