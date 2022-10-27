import { ApiProperty } from '@nestjs/swagger';

export class AddedProduct {
  @ApiProperty({ example: 'product added successfully' })
  message;
}

export class GetAllProducts {
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
  products;
}

export class Deleted {
  @ApiProperty({ example: 'Product removed from cart' })
  message;
}
