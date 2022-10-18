import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  foodIntake: string;

  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
