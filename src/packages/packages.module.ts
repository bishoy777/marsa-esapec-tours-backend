import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Package } from './entities/package.entity';
import { PackageService } from './packages.service';
import { PackageController } from './packages.controller';
import { Trip } from '@/trip/entities/trip.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Package, Trip])],
  controllers: [PackageController],
  providers: [PackageService],
})
export class PackageModule {}
