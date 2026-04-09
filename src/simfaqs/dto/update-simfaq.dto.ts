import { PartialType } from '@nestjs/mapped-types';
import { CreateSimfaqDto } from './create-simfaq.dto';

export class UpdateSimfaqDto extends PartialType(CreateSimfaqDto) {}
