import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { PackageService } from './packages.service';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';

@Controller('packages')
export class PackageController {
  constructor(private readonly packageService: PackageService) {}

  @Post()
  create(@Body() dto: CreatePackageDto) {
    return this.packageService.create(dto);
  }

  @Get()
  findAll(
    @Query('page') page: string = '1',
    @Query('perPage') perPage: string = '10',
  ) {
    {
      return this.packageService.findAll(+page, +perPage);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.packageService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdatePackageDto) {
    return this.packageService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.packageService.remove(+id);
  }
}
