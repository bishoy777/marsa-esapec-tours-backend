import { PartialType } from '@nestjs/mapped-types';
import { CreateSimreservationDto } from './create-simreservation.dto';

export class UpdateSimreservationDto extends PartialType(
  CreateSimreservationDto,
) {}
