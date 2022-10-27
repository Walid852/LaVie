import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {}
export class UpdatedProduct {
  @ApiProperty({
    example: {
      id: '419fa95e-5361-4229-830f-9bf7bfdf031f',
      name: 'Flower',
      price: 50,
      superCategory: 'Plants',
      photo: 'uploads/productsimages/image',
      subCategory: 'Annuals',
      quantity: 20,
      sunlight: 30,
      temprature: 40,
      informations: 'This is a very Good Flower',
      water: 10,
      soldAmount: 0,
    },
  })
  updatedProduct;
}
