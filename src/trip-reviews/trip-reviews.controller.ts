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
import { TripReviewsService } from './trip-reviews.service';
import { CreateTripReviewDto } from './dto/create-trip-review.dto';
import { UpdateTripReviewDto } from './dto/update-trip-review.dto';

@Controller('trip-reviews')
export class TripReviewsController {
  constructor(private readonly tripReviewsService: TripReviewsService) {}

  @Post()
  create(@Body() createTripReviewDto: CreateTripReviewDto) {
    return this.tripReviewsService.create(createTripReviewDto);
  }

  @Get()
  findAll(
    @Query('page') page: string = '1',
    @Query('perPage') perPage: string = '10',
  ) {
    return this.tripReviewsService.findAll(+page, +perPage);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tripReviewsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTripReviewDto: UpdateTripReviewDto,
  ) {
    return this.tripReviewsService.update(+id, updateTripReviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tripReviewsService.remove(+id);
  }
}
