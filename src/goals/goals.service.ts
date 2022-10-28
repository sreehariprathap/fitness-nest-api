import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import { GoalDto } from './dto/goal.dto';

@Injectable()
export class GoalsService {
  constructor(private prisma: PrismaService, private config: ConfigService) {}

  async addGoal(dto: GoalDto) {
    try {
      const goal = await this.prisma.goals.create({
        data: {
          userId: dto.userId,
          title: dto.title,
          description: dto.description,
          year: dto.year,
          status: dto.status,
        },
      });
      return { goal };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('something went wrong');
        }
      }
      throw error;
    }
  }

  async getAllGoals(id: number) {
    const goals = await this.prisma.goals.findMany({
      where: {
        userId: {
          equals: +id,
        },
      },
    });
    return { goals };
  }

  async changeStatus(id: number, status: string) {
    const goal = await this.prisma.goals.update({
      where: {
        id: +id,
      },
      data: {
        status: status,
      },
    });
    return { goal };
  }

  async getDailyGoals(id: number) {
    const goal = await this.prisma.dailyGoals.findMany({
      where: {
        userId: +id,
      },
    });
    return { goal };
  }

  async addWater(id: number, action: string) {
    const dailyGoals = await this.prisma.dailyGoals.findUnique({
      where: {
        id: +id,
      },
    });
    if (action === 'add') {
      const waterCount = await this.prisma.dailyGoals.update({
        where: {
          id: +id,
        },
        data: {
          waterCount: { increment: 1 },
        },
      });
      return { waterCount };
    } else if (action === 'subtract' && dailyGoals.waterCount > 0) {
      const waterCount = await this.prisma.dailyGoals.update({
        where: {
          id: +id,
        },
        data: {
          waterCount: { decrement: 1 },
        },
      });
      return { waterCount };
    }
    throw new ForbiddenException('water cant be subtracted');
  }
}
