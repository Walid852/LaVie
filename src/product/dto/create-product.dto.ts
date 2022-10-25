import { IsString, IsNotEmpty } from 'class-validator';
export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name;
  @IsNotEmpty()
  superCategory;
  @IsNotEmpty()
  subCategory;
  @IsNotEmpty()
  price;
  @IsNotEmpty()
  quantity;
  sunlight;
  temprature;
  @IsNotEmpty()
  @IsString()
  information;
  water;
}
