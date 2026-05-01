// dto/update-reservation.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreatepackagereservationDto } from './create-packagereservation.dto';

export class UpdatepackagereservationDto extends PartialType(
  CreatepackagereservationDto,
) {}
