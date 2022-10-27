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
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { query } from 'express';
import { FiltersService } from './filters.service';
import { ApiAcceptedResponse, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BestSelling, Categories } from './dto/createdto';
@UseGuards(JwtGuard)
@ApiTags('Filters')
@ApiBearerAuth()
@Controller('filters')
export class FiltersController {
  constructor(private readonly filtersService: FiltersService) {}
  @ApiAcceptedResponse({ type: Categories })
  @Get()
  findAll() {
    return this.filtersService.findAll();
  }
  @ApiAcceptedResponse({ type: BestSelling })
  @Get('bestseller')
  bestSeller(@Query() query) {
    return this.filtersService.getBestSelling(query.p);
  }
}
