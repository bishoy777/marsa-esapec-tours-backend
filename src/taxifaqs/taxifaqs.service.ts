import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaxifaqDto } from './dto/create-taxifaq.dto';
import { UpdateTaxifaqDto } from './dto/update-taxifaq.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Taxifaq } from './entities/taxifaq.entity';

@Injectable()
export class TaxifaqsService {
  constructor(
    @InjectRepository(Taxifaq)
    private repo: Repository<Taxifaq>,
  ) {}

  // ✅ Create FAQ
  async create(createTaxifaqDto: CreateTaxifaqDto) {
    const faq = this.repo.create(createTaxifaqDto);
    return await this.repo.save(faq);
  }

  // ✅ Get all FAQs
  async findAll() {
    return await this.repo.find();
  }

  // ✅ Get one FAQ
  async findOne(id: number) {
    const faq = await this.repo.findOne({
      where: { id },
    });

    if (!faq) {
      throw new NotFoundException('Taxi FAQ not found');
    }

    return faq;
  }

  // ✅ Update FAQ
  async update(id: number, updateTaxifaqDto: UpdateTaxifaqDto) {
    const faq = await this.findOne(id);

    Object.assign(faq, updateTaxifaqDto);

    return await this.repo.save(faq);
  }

  // ✅ Delete FAQ
  async remove(id: number) {
    const faq = await this.findOne(id);
    return await this.repo.remove(faq);
  }
}
