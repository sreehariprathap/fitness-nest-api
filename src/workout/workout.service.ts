import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import { WeightDto } from './dto/weight.dto';
import { WorkOutDto } from './dto/workout.dto';

@Injectable()
export class WorkoutService {
  constructor(private prisma: PrismaService, private config: ConfigService) {}

  async addWorkout(dto: WorkOutDto) {
    try {
      const workout = await this.prisma.workOut.create({
        data: {
          userId: dto.userId,
          caloriesBurned: dto.caloriesBurned,
          workoutName: dto.workoutName,
        },
      });
      return { workout };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('something went wrong');
        }
      }
      throw error;
    }
  }

  async getWorkouts(id: number) {
    const date = new Date();
    const previous = new Date(date.getTime());
    previous.setDate(date.getDate() - 1);
    const workout = await this.prisma.workOut.findMany({
      where: {
        userId: {
          equals: +id,
        },
        createAt: {
          gte: previous,
          lt: date,
        },
      },
    });
    return { workout };
  }

  async getCaloriesBurned(id: number) {
    const date = new Date();
    const previous = new Date(date.getTime());
    previous.setDate(date.getDate() - 1);
    let burnedCalories = 0;
    const calories = await this.prisma.workOut.findMany({
      where: {
        userId: {
          equals: +id,
        },
        createAt: {
          gt: previous,
        },
      },
    });
    calories.forEach((workOut) => {
      burnedCalories += +workOut.caloriesBurned;
    });
    return { burnedCalories };
  }

  async addWeight(dto: WeightDto) {
    try {
      const weight = await this.prisma.weights.create({
        data: {
          userId: dto.userId,
          weight: dto.weight,
        },
      });
      return { weight };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('something went wrong');
        }
      }
      throw error;
    }
  }

  async getWeightHistory(id: number) {
    const weights = await this.prisma.weights.findMany({
      orderBy: [
        {
          createAt: 'asc',
        },
      ],
      where: {
        userId: {
          equals: +id,
        },
      },
      select: {
        weight: true,
        createAt: true,
      },
    });
    return { weights };
  }

  async getWorkoutHeatMap(id: number, date: string) {
    const filterDate = new Date(date);
    const workouts = await this.prisma.workOut.findMany({
      orderBy: [
        {
          createAt: 'asc',
        },
      ],
      where: {
        userId: {
          equals: +id,
        },
        createAt: {
          gte: filterDate,
        },
      },
      select: {
        caloriesBurned: true,
        createAt: true,
      },
    });
    return { workouts };
  }
}
