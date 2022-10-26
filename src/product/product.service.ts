import { Injectable } from '@nestjs/common';
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
  // ask about filters
  async findAll(query: any) {
    const superFilter = query.supF;
    const subFilter = query.subF;
    console.log(query.supF);

    return 'f';
  }
  allproducts = async function (...subFilters: string[], page: number) {
    const allproductsFilters: string[] = [];
    const subFiltersArray: string[] = [];
    subFilters.forEach((elem, i) => {
      // guard class for undefineds
      if (!elem) return { error: "filters doesn't exist" };
      if (elem.includes('all')) {
        elem.replace('all ', '');
        allproductsFilters.push(elem);
      } else {
        subFiltersArray.push(elem);
      }
    });
    if (!page) page = 1;
    const limit = 10;
    const skip = (page - 1) * limit;
    const products1=await this.prismaService.products.fin;
  };
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
