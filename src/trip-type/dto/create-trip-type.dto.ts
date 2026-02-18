import { IsString, IsNotEmpty } from 'class-validator';

export class CreateTripTypeDto {
  @IsString()
  @IsNotEmpty()
  type: string;
}
