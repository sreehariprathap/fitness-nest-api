import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  // @IsString()
  // @IsNotEmpty()
  firstName: string;

  // @IsString()
  // @IsNotEmpty()
  lastName: string;
}
export class SignUpDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  // @IsNotEmpty()
  lastName: string;

  @IsString()
  phone: string;

  @IsString()
  height: string;

  @IsString()
  weight: string;

  @IsString()
  gender: string;

  @IsString()
  dateOfBirth: string;
}

export class UserDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
