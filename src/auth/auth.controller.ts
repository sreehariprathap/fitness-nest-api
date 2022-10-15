/* eslint-disable prettier/prettier */
import { Controller, HttpStatus, Post } from '@nestjs/common';
import { Body, Get, HttpCode } from '@nestjs/common/decorators';
import { AuthService } from './auth.service';
import { AuthDto, SignUpDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('adminSignUp')
  signUp(@Body() dto: AuthDto) {
    console.log(dto);
    return this.authService.signUp(dto);
  }

  @Post('signup')
  signUpUser(@Body() dto: SignUpDto) {
    console.log(dto);
    return this.authService.signUpUser(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signIn(@Body() dto: AuthDto) {
    return this.authService.signIn(dto);
  }

  @Get('users')
  getUsers() {
    return this.authService.getUsers();
  }
}
