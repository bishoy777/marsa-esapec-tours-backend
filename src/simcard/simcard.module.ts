import { Module } from '@nestjs/common';
import { SimcardService } from './simcard.service';
import { SimcardController } from './simcard.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Simcard } from './entities/simcard.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Simcard])],
  controllers: [SimcardController],
  providers: [SimcardService],
})
export class SimcardModule {}
