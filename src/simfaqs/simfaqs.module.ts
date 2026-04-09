import { Module } from '@nestjs/common';
import { SimfaqsService } from './simfaqs.service';
import { SimfaqsController } from './simfaqs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Simfaq } from './entities/simfaq.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Simfaq])],
  controllers: [SimfaqsController],
  providers: [SimfaqsService],
})
export class SimfaqsModule {}
