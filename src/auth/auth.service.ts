/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { AuthDto, SignUpDto, UserDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { ForbiddenException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt/dist';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config/dist/config.service';
import { ok } from 'assert';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signUp(dto: AuthDto) {
    // generate the password
    const hash = await argon.hash(dto.password);
    // save the new user in db
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
          firstName: dto.firstName,
          lastName: dto.lastName,
        },
      });
      // return the saved user
      // return this.signToken(user.id, user.email);
      return ok;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials already taken');
        }
      }
      throw error;
    }
  }

  async signUpUser(dto: SignUpDto) {
    // generate the password
    const hash = await argon.hash(dto.password);
    // save the new user in db
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
          firstName: dto.firstName,
          lastName: dto.lastName,
          gender: dto.gender,
        },
      });
      const fitness = await this.prisma.fitness.create({
        data: {
          weight: dto.weight,
          height: dto.height,
          bmi: this.bmi(+dto.weight, +dto.height),
          caloriesPerDay: (this.bmr(
            +dto.weight,
            +dto.height,
            dto.dateOfBirth,
            dto.gender,
          )).toString(),
          age: this.getAge(dto.dateOfBirth),
          userId: user.id,
        },
      });
      const dailyGoals = await this.prisma.dailyGoals.create({
        data: {
          userId: user.id,
          inTakeGoal: +this.bmr(
            +dto.weight,
            +dto.height,
            dto.dateOfBirth,
            dto.gender,
          ),
          burnGoal: 600,
          waterGoal: this.waterIntakeCalculator(+dto.weight),
        },
      });
      return {user};
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials already taken');
        }
      }
      throw error;
    }
  }

  async signIn(dto: AuthDto): Promise<{ access_token: string }> {
    // find user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    // if user does not exist throw exception
    if (!user) throw new ForbiddenException('User does not exist');
    // compare password
    const pwMatches = await argon.verify(user.hash, dto.password);
    // if password incorrect throw exception
    if (!pwMatches) throw new ForbiddenException('Password incorrect');
    // send back the user if successfull
    return this.signToken(user.id, user.email);
  }

  async signToken(userId: number, email: string) {
    const payload = {
      sub: userId,
      email,
    };

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });
    return {
      access_token: token,
      userId: userId,
      email: email,
    };
  }

  async getUsers() {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async getuserDetails(dto: UserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: dto.id,
      },
    });
    const fitness = await this.prisma.fitness.findFirst({
      where: {
        userId: dto.id,
      },
    });
    if (user != null && fitness != null) {
      return { user, fitness };
    } else {
      return null;
    }
  }

  //bmiCalculator
  bmi(weight: number, height: number) {
    return (weight / Math.pow(height * 0.01, 2)).toString();
  }

  //bmr calculator
  bmr(weight: number, height: number, dateOfBirth: string, gender?: string) {
    const age = this.getAge(dateOfBirth);
    if (gender == 'male') {
      return (10 * weight + 6.25 * height - 5 * age + 5).toString();
    } else if (gender == 'female') {
      return (10 * weight + 6.25 * height - 5 * age - 16).toString();
    }
    return Math.round(66.47 + 13.75 * weight + 5.003 * height - 6.755 * age);
  }

  //calculate age
  getAge(dateString) {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  // calculate amount of water to drink in bottles
  waterIntakeCalculator(weight: number) {
    // Water (in litres) to drink a day = Your Weight (in Kg) multiplied by 0.033
    return Math.round(weight * 0.033);
  }
}
