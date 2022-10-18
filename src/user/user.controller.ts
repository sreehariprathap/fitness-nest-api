import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { UserDto } from 'src/auth/dto';
import { JwtGuard } from 'src/auth/guard';
import { UserService } from './user.service';

// @UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @Post('me')
  getuserDetails(@Body() dto: UserDto) {
    return this.userService.getuserDetails(dto);
  }
}
