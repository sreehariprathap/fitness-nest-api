import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}
  private readonly logger = new Logger(TasksService.name);

  // reset goals every day at 11.59 pm
  @Cron('* 59 23 * * *')
  // @Cron('59 * * * * *')
  async resetDailyGoals() {
    await this.prisma.dailyGoals.updateMany({
      data: {
        inTakeGoalStatus: false,
        burnGoalStatus: false,
        waterGoalStatus: false,
        inTakeGoalCount: 0,
        burnGoalCount: 0,
        waterCount: 0,
      },
    });
  }
}
