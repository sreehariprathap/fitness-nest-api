import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

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
  dateOfBirth: string;
}
