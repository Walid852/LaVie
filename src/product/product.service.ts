import { Injectable } from '@nestjs/common';
import { limits } from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private prismaService: PrismaService) {}
  async create(createProductDto: CreateProductDto) {
    const newProduct = await this.prismaService.products.create({
      data: {
        name: createProductDto.name,
        price: +createProductDto.price,
        superCategory: createProductDto.superCategory,
        subCategory: createProductDto.subCategory,
        quantity: +createProductDto.quantity,
        sunlight: createProductDto.sunlight ? +createProductDto.sunlight : null,
        temprature: createProductDto.temprature
          ? +createProductDto.temprature
          : null,
        water: createProductDto.water ? +createProductDto.water : null,
        informations: createProductDto.information,
      },
    });
    return { newProduct };
  }

  async findAll(query: any) {
    const superFilter = query.supF;
    const subFilter = query.subF;
    let page = +query.p;
    if (!page) page = 1;
    const limit = 10;
    const skip = (page - 1) * limit;
    if (!superFilter && !subFilter) {
      return this.allProducts(limit, skip);
    }
    if (superFilter?.includes('all')) {
      return this.allProductsFilter(subFilter, limit, skip);
    } else {
      if (subFilter?.includes('all') || !subFilter) {
        return await this.prismaService.products.findMany({
          where: { superCategory: superFilter },
          take: limit,
          skip: skip,
        });
      } else {
        return this.filters(superFilter, subFilter, limit, skip);
      }
    }
  }
  async allProducts(limit: number, skip: number) {
    const plants = await this.prismaService.products.findMany({
      where: { superCategory: 'plants' },
      take: Math.floor(limit / 3),
      skip: Math.floor(skip / 3),
    });
    const seeds = await this.prismaService.products.findMany({
      where: { superCategory: 'seeds' },
      take: Math.floor(limit / 3),
      skip: Math.floor(skip / 3),
    });
    const tools = await this.prismaService.products.findMany({
      where: { superCategory: 'tools' },
      take: Math.ceil(limit / 3),
      skip: Math.ceil(skip / 3),
    });
    return { plants, seeds, tools };
  }
  async filters(
    superFilters: string,
    subFiltes: string,
    limit: number,
    skip: number,
  ) {
    if (!subFiltes) return { error: "filters doesn't exist" };
    const products = await this.prismaService.products.findMany({
      where: { superCategory: superFilters, subCategory: subFiltes },
      take: limit,
      skip: skip,
    });
    return products;
  }
  async allProductsFilter(subFilters: string[], limit: number, skip: number) {
    const superCatFilters: string[] = [];
    const subFiltersArray: string[] = [];
    subFilters.forEach((elem) => {
      // guard class for undefineds
      if (!elem) return { error: "filters doesn't exist" };
      if (elem.includes('all')) {
        elem.replace('all ', '');
        superCatFilters.push(elem);
      } else {
        subFiltersArray.push(elem);
      }
    });
    const superCatProducts = await this.prismaService.products.findMany({
      where: { superCategory: { in: superCatFilters } },
      take: limit,
      skip: skip,
    });
    const subCatProducts = await this.prismaService.products.findMany({
      where: { subCategory: { in: subFiltersArray } },
      take: limit,
      skip: skip,
    });
    return { superCatProducts, subCatProducts };
  }
  async findOne(id: string) {
    const product = await this.prismaService.products.findFirst({
      where: { id: id },
    });
    return product;
  }
  //ADMIN ROLE
  // ask for data should be updated
  async update(id: string, updateProductDto: UpdateProductDto) {
    const updatedProduct = await this.prismaService.products.update({
      where: { id: id },
      data: {
        name: updateProductDto.name,
        price: updateProductDto.price,
        superCategory: updateProductDto.superCategory,
        quantity: updateProductDto.quantity,
        sunlight: updateProductDto.sunlight,
        temprature: updateProductDto.temprature,
        informations: updateProductDto.information,
        water: updateProductDto.water,
      },
    });
    return updatedProduct;
  }

  async remove(id: string) {
    const deletedProduct = await this.prismaService.products.delete({
      where: { id: id },
    });
    return { message: 'product deleted successfully', deletedProduct };
  }
  
}
