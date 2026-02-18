import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFiles,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { TripService } from './trip.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@/auth/auth.guard';
import { multerConfig } from '@/common/config/multer.config';
@Controller('trip')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(FilesInterceptor('images', 5, multerConfig))
  async create(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() createTripDto: CreateTripDto,
  ) {
    const imageUrls = files?.map((file) => `/uploads/${file.filename}`) || [];
    return this.tripService.create(createTripDto, imageUrls);
  }
  // @Post('upload')
  // @UseInterceptors(FilesInterceptor('image', 5, multerConfig))
  // uploadImage(@UploadedFile() file: Express.Multer.File) {
  //   return {
  //     filename: file.filename,
  //     path: file.path,
  //   };
  // }
  @Get()
  findAll() {
    return this.tripService.findAll();
  }

  @Get('search')
  searchByType(@Query('tripTypeId') tripTypeId: string) {
    return this.tripService.findByType(+tripTypeId);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tripService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @UseInterceptors(FilesInterceptor('images', 5, multerConfig))
  async update(
    @Param('id') id: string,
    @Body() updateTripDto: UpdateTripDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const imageUrls = files?.map((file) => `/uploads/${file.filename}`) || [];
    return this.tripService.update(+id, updateTripDto, imageUrls);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.tripService.remove(+id);
  }
  @Delete('images/:id')
  @UseGuards(AuthGuard)
  removeImage(@Param('id') id: string) {
    return this.tripService.removeImage(+id);
  }
}
