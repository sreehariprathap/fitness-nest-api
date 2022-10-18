import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config/dist/config.service';
import { UserDto } from 'src/auth/dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private config: ConfigService) {}

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
    return { user, fitness };
  }

  async addFoodIntake(dto: FoodDto) {
    try {
      const foodIntake = await this.prisma.foodIntake.create({
        data: {
          calories: dto.foodItem,
          userId: dto.userId,
        },
      });
      return { foodIntake };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('something went wrong');
        }
      }
      throw error;
    }
  }
}
