import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Package } from './entities/package.entity';
import { Trip } from '@/trip/entities/trip.entity';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';

@Injectable()
export class PackageService {
  constructor(
    @InjectRepository(Package)
    private packageRepo: Repository<Package>,

    @InjectRepository(Trip)
    private tripRepo: Repository<Trip>,
  ) {}

  // ✅ Create
  async create(dto: CreatePackageDto) {
    const trips = await this.tripRepo.find({
      where: { id: In(dto.tripIds) },
    });

    const pkg = this.packageRepo.create({
      name: dto.name,
      price: dto.price,
      description: dto.description,
      included: dto.included,
      excluded: dto.excluded,
      highlights: dto.highlights,
      trips,
    });

    return this.packageRepo.save(pkg);
  }

  // ✅ Get all
  async findAll() {
    return this.packageRepo.find(); // eager already loads trips
  }

  // ✅ Get one
  async findOne(id: number) {
    const pkg = await this.packageRepo.findOne({ where: { id } });
    if (!pkg) throw new NotFoundException('Package not found');
    return pkg;
  }

  // ✅ Update
  async update(id: number, dto: UpdatePackageDto) {
    const pkg = await this.findOne(id);

    if (dto.tripIds) {
      const trips = await this.tripRepo.find({
        where: { id: In(dto.tripIds) },
      });
      pkg.trips = trips;
    }

    Object.assign(pkg, dto);

    return this.packageRepo.save(pkg);
  }

  // ✅ Delete
  async remove(id: number) {
    const pkg = await this.findOne(id);
    await this.packageRepo.remove(pkg);
    return { message: `Package ${id} deleted successfully` };
  }
}