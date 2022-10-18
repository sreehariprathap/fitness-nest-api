import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class FoodDto {
  @IsString()
  @IsNotEmpty()
  foodIntake: string;

  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  calories: string;
}
