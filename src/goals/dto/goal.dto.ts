import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GoalDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsBoolean()
  @IsNotEmpty()
  status: boolean;

  @IsString()
  @IsNotEmpty()
  year: string;

  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
