import { IsNotEmpty, IsNumber } from 'class-validator';

export class WeightDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  weight: number;
}
