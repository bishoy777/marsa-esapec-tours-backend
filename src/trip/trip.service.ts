import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateTripDto } from './dto/create-trip.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateTripDto } from './dto/update-trip.dto';
import { Trip } from './entities/trip.entity';
import { TripImage } from '@/trip/entities/trip-image.entity';

@Injectable()
export class TripService {
  constructor(
    @InjectRepository(Trip)
    private tripsRepository: Repository<Trip>,
    @InjectRepository(TripImage)
    private readonly tripImageRepository: Repository<TripImage>,
  ) {}
  async create(dto: CreateTripDto, imageUrls: string[]) {
    // Save trip
    const trip = await this.tripsRepository.save({
      ...dto,
      tripType: { id: dto.tripTypeId },
    });

    // Save images
    if (imageUrls?.length) {
      const images = imageUrls.map((url) =>
        this.tripImageRepository.create({ url, trip }),
      );
      await this.tripImageRepository.save(images);
    }

    // Return trip with tripType and images
    return this.tripsRepository.findOne({
      where: { id: trip.id },
      relations: ['tripType', 'images'],
    });
  }

  // Find all trips with images
  async findAll() {
    return this.tripsRepository.find({
      relations: ['tripType', 'images'],
    });
  }

  async findOne(id: number) {
    const trip = await this.tripsRepository.findOne({
      where: { id },
      relations: ['tripType', 'images'],
    });

    if (!trip) {
      throw new NotFoundException(`Trip with id ${id} not found`);
    }

    return trip;
  }
  async findByType(tripTypeId: number) {
    return this.tripsRepository.find({
      where: { tripType: { id: tripTypeId } },
      relations: ['tripType', 'images'],
    });
  }
  async update(id: number, dto: UpdateTripDto, imageUrls: string[] = []) {
    const trip = await this.tripsRepository.findOne({
      where: { id },
      relations: ['images', 'tripType'],
    });

    if (!trip) {
      throw new NotFoundException(`Trip with id ${id} not found`);
    }

    // Update trip fields
    Object.assign(trip, dto);
    if (dto.tripTypeId) {
      trip.tripType = { id: dto.tripTypeId } as any;
    }

    await this.tripsRepository.save(trip);

    // Add new images if any
    if (imageUrls?.length) {
      const newImages = imageUrls.map((url) =>
        this.tripImageRepository.create({ url, trip }),
      );
      await this.tripImageRepository.save(newImages);
    }
    return this.tripsRepository.findOne({
      where: { id: trip.id },
      relations: ['tripType', 'images'],
    });
  }
  async remove(id: number) {
    // Find the trip first
    const trip = await this.tripsRepository.findOne({
      where: { id },
      relations: ['images'], // optional, ensures images are loaded
    });

    if (!trip) {
      // Trip not found
      throw new Error(`Trip with id ${id} not found`);
    }

    // Remove the trip (images will be deleted automatically via cascade)
    await this.tripsRepository.remove(trip);

    return { message: `Trip with id ${id} has been successfully deleted` };
  }
  async removeImage(id: number) {
    const image = await this.tripImageRepository.findOne({
      where: { id },
      relations: ['trip'],
    });

    if (!image) {
      throw new NotFoundException(`Image with id ${id} not found`);
    }

    await this.tripImageRepository.remove(image);

    return { message: `Image with id ${id} has been deleted successfully` };
  }
}
