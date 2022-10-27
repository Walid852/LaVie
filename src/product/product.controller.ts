import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  UseInterceptors,
  Request,
  UploadedFile,
} from '@nestjs/common';
import { ProductService } from './product.service';
import {
  CreateProductDto,
  CreatedProduct,
  allProducts,
  DeletedProduct,
  UpdatePhoto,
} from './dto/create-product.dto';
import { UpdatedProduct, UpdateProductDto } from './dto/update-product.dto';
import { JwtGuard } from 'src/auth/guard';
import { storage } from 'src/users/users.controller';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
@ApiTags('Products')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @ApiBody({
    description: 'Create Product',
    type: CreateProductDto,
  })
  @ApiResponse({
    description: 'Product added successfully',
    type: CreatedProduct,
  })
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }
  @ApiBody({
    description: 'Upload Photo',
    type: UpdatePhoto,
  })
  @ApiResponse({
    description: 'photo uploaded',
    type: UpdatedProduct,
  })
  @Post('uploadphoto:id')
  uploadFile(
    @Param('id') id: string,
    @Body() updateProductdto: UpdateProductDto,
  ) {
    return this.productService.updatePhoto(id, updateProductdto);
  }
  @ApiResponse({
    description: 'All Products',
    type: allProducts,
  })
  @Get()
  findAll(@Query() query) {
    return this.productService.findAll(query);
  }
  @ApiResponse({
    description: 'Specific Product',
    type: CreatedProduct,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @ApiBody({ description: 'Updating Data', type: CreateProductDto })
  @ApiResponse({
    description: 'update Product',
    type: UpdatedProduct,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }
  @ApiResponse({ description: 'Delete Product', type: DeletedProduct })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
