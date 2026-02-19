import { PartialType } from '@nestjs/mapped-types';
import { CreateTaxibookingDto } from './create-taxibooking.dto';

export class UpdateTaxibookingDto extends PartialType(CreateTaxibookingDto) {}
