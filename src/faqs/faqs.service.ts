import { Injectable } from '@nestjs/common';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Faq } from './entities/faq.entity';

@Injectable()
export class FaqsService {
  constructor(
    @InjectRepository(Faq)
    private readonly faqRepo: Repository<Faq>,
  ) {}
  create(createFaqDto: CreateFaqDto) {
    return this.faqRepo.save(this.faqRepo.create(createFaqDto));
  }

  findAll() {
    return this.faqRepo.find();
  }

  async update(id: number, updateFaqDto: UpdateFaqDto) {
    const faq = await this.faqRepo.findOne({ where: { id } });
    if (!faq) {
      throw new Error(`Faq with id ${id} not found`);
    }
    Object.assign(faq, updateFaqDto);
    await this.faqRepo.save(faq);
    return faq;
  }

  async remove(id: number) {
    await this.faqRepo.delete(id);
    return { message: `Faq ${id} deleted successfully` };
  }
}
