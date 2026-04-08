import { PartialType } from '@nestjs/mapped-types';
import { CreateSimcardDto } from './create-simcard.dto';

export class UpdateSimcardDto extends PartialType(CreateSimcardDto) {}
