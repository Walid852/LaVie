import { IsString, IsNotEmpty } from 'class-validator';
export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name;
  @IsNotEmpty()
  @IsString()
  superCategory;
  @IsNotEmpty()
  @IsString()
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
