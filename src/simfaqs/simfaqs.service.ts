import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSimfaqDto } from './dto/create-simfaq.dto';
import { UpdateSimfaqDto } from './dto/update-simfaq.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Simfaq } from './entities/simfaq.entity';

@Injectable()
export class SimfaqsService {
  constructor(
    @InjectRepository(Simfaq)
    private repo: Repository<Simfaq>,
  ) {}

  // ✅ Create
  async create(createSimfaqDto: CreateSimfaqDto) {
    const faq = this.repo.create(createSimfaqDto);
    return await this.repo.save(faq);
  }

  // ✅ Get all
  async findAll() {
    return await this.repo.find();
  }

  // ✅ Get one
  async findOne(id: number) {
    const faq = await this.repo.findOne({
      where: { id },
    });

    if (!faq) {
      throw new NotFoundException('SIM FAQ not found');
    }

    return faq;
  }

  // ✅ Update
  async update(id: number, updateSimfaqDto: UpdateSimfaqDto) {
    const faq = await this.findOne(id);

    Object.assign(faq, updateSimfaqDto);

    return await this.repo.save(faq);
  }

  // ✅ Delete
  async remove(id: number) {
    const faq = await this.findOne(id);
    return await this.repo.remove(faq);
  }
}
