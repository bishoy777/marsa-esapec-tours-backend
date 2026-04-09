import { PartialType } from '@nestjs/mapped-types';
import { CreateTaxireviewDto } from './create-taxireview.dto';

export class UpdateTaxireviewDto extends PartialType(CreateTaxireviewDto) {}
