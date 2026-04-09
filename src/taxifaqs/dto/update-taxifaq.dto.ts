import { PartialType } from '@nestjs/mapped-types';
import { CreateTaxifaqDto } from './create-taxifaq.dto';

export class UpdateTaxifaqDto extends PartialType(CreateTaxifaqDto) {}
