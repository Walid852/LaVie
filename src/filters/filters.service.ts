import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FiltersService {
  constructor(private prismaService: PrismaService) {}
  async findAll() {
    const superCategories = await this.prismaService.products.findMany({
      where: {},
      distinct: ['superCategory'],
      select: { superCategory: true },
    });

    const categories: any[] = [];
    for (const cat of superCategories) {
      const subCats = await this.prismaService.products.findMany({
        where: { superCategory: cat.superCategory },
        distinct: ['subCategory'],
        select: { subCategory: true },
      });
      const categObject = {
        superCategory: cat.superCategory,
        subCategories: subCats,
      };
      categories.push(categObject);
    }
    return { categories: categories };
  }
  async getBestSelling(page: number) {
    if (!page) page = 1;
    const limit = 10;
    const skip = (page - 1) * limit;
    const bestSelling = await this.prismaService.products.findMany({
      orderBy: { soldAmount: 'desc' },
      take: limit,
      skip: skip,
    });
    return { bestselling: bestSelling };
  }
}
