import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import { FoodDto } from './dto/food.dto';

@Injectable()
export class FoodService {
  constructor(private prisma: PrismaService, private config: ConfigService) {}

  async addFoodIntake(dto: FoodDto) {
    try {
      const foodIntake = await this.prisma.foodIntake.create({
        data: {
          userId: dto.userId,
          calories: dto.calories,
          foodItem: dto.foodIntake,
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

  async getFoodIntakes(id: number) {
    const date = new Date();
    const previous = new Date(date.getTime());
    previous.setDate(date.getDate() - 1);
    const foodIntake = await this.prisma.foodIntake.findMany({
      where: {
        userId: {
          equals: +id,
        },
        createAt: {
          gte: previous,
        },
      },
    });
    return { foodIntake };
  }
}
