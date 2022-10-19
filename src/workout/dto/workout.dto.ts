import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class WorkOutDto {
  @IsString()
  @IsNotEmpty()
  caloriesBurned: string;

  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  workoutName: string;
}
