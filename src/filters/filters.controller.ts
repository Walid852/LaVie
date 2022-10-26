import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { query } from 'express';
import { FiltersService } from './filters.service';

@Controller('filters')
export class FiltersController {
  constructor(private readonly filtersService: FiltersService) {}

  @Get()
  findAll() {
    return this.filtersService.findAll();
  }
  @Get('bestseller')
  bestSeller(@Query() query) {
    return this.filtersService.getBestSelling(query.p);
  }
}
