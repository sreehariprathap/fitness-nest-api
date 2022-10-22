import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class TodoDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  status: boolean;

  @IsNotEmpty()
  date: Date;

  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
