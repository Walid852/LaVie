import { IsString, IsNotEmpty, IsArray, isArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Flower',
  })
  name;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Plants',
  })
  superCategory;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Annuals',
  })
  subCategory;
  @IsNotEmpty()
  @ApiProperty({
    example: 50,
  })
  price;
  @IsNotEmpty()
  @ApiProperty({
    example: 20,
  })
  quantity;
  @ApiProperty({
    example: 30,
  })
  sunlight;
  @ApiProperty({
    example: 40,
  })
  temprature;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'This is a very Good Flower',
  })
  information;
  @ApiProperty({
    example: 10,
  })
  water;
  @IsString()
  @ApiProperty({
    example: 'uploads/productsimages/photo.png',
  })
  photoUrl;
}

export class CreatedProduct {
  @ApiProperty({
    example: {
      id: '419fa95e-5361-4229-830f-9bf7bfdf031f',
      name: 'Flower',
      price: 50,
      superCategory: 'Plants',
      photo: 'uploads/productsimages/photo.png',
      subCategory: 'Annuals',
      quantity: 20,
      sunlight: 30,
      temprature: 40,
      informations: 'This is a very Good Flower',
      water: 10,
      soldAmount: 0,
    },
  })
  newProduct;
}

export class allProducts {
  @ApiProperty({
    example: [
      {
        id: '11472a49-2662-4439-9fe5-9e72e38a843d',
        name: 'Flower',
        price: 50,
        superCategory: 'Plants',
        photo: 'uploads/productsimages/photo.png',
        subCategory: 'Annuals',
        quantity: 20,
        sunlight: 30,
        temprature: 40,
        informations: 'This is a very Good Flower',
        water: 10,
        soldAmount: 0,
      },
    ],
  })
  plants;
  @ApiProperty({
    example: [
      {
        id: '4c447254-d72d-4b58-a4a9-289ba21ad9c3',
        name: 'Flower',
        price: 50,
        superCategory: 'Seeds',
        photo: 'uploads/productsimages/photo.png',
        subCategory: 'Annuals',
        quantity: 20,
        sunlight: 30,
        temprature: 40,
        informations: 'This is a very Good Flower',
        water: 10,
        soldAmount: 0,
      },
    ],
  })
  seeds;
  @ApiProperty({
    example: [
      {
        id: '4c725c71-9510-4a8e-b8a1-185474b9ba8d',
        name: 'Farming tool',
        price: 50,
        superCategory: 'Tools',
        photo: 'uploads/productsimages/photo.png',
        subCategory: 'Annuals',
        quantity: 20,
        sunlight: 30,
        temprature: 40,
        informations: 'This is a very Good Flower',
        water: 10,
        soldAmount: 0,
      },
    ],
  })
  tools;
}

export class DeletedProduct {
  @ApiProperty({ example: 'product deleted successfully' })
  message;
  @ApiProperty({
    example: {
      id: '0966aaff-0c2b-4b7a-ae32-1d110d38198e',
      name: 'Flower',
      price: 50,
      superCategory: 'Seeds',
      photo: 'uploads/productsimages/photo.png',
      subCategory: 'Annuals',
      quantity: 20,
      sunlight: 30,
      temprature: 40,
      informations: 'This is a very Good Flower',
      water: 10,
      soldAmount: 0,
    },
  })
  deletedProduct;
}

export class UpdatePhoto {
  @ApiProperty({ example: 'uploads/productimages/image' })
  photoUrl;
}
