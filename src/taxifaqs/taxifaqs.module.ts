import { Module } from '@nestjs/common';
import { TaxifaqsService } from './taxifaqs.service';
import { TaxifaqsController } from './taxifaqs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Taxifaq } from './entities/taxifaq.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Taxifaq])],
  controllers: [TaxifaqsController],
  providers: [TaxifaqsService],
})
export class TaxifaqsModule {}
