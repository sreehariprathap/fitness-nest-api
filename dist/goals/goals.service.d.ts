import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { GoalDto } from './dto/goal.dto';
export declare class GoalsService {
    private prisma;
    private config;
    constructor(prisma: PrismaService, config: ConfigService);
    addGoal(dto: GoalDto): Promise<{
        goal: import(".prisma/client").Goals;
    }>;
    getAllGoals(id: number): Promise<{
        goals: import(".prisma/client").Goals[];
    }>;
    changeStatus(id: number, status: string): Promise<{
        goal: import(".prisma/client").Goals;
    }>;
    dailyGoalsStatusChange(id: number, action: string): Promise<{
        goal: import(".prisma/client").DailyGoals;
    }>;
    getDailyGoals(id: number): Promise<{
        goal: import(".prisma/client").DailyGoals[];
    }>;
    addWater(id: number, action: string): Promise<{
        waterCount: import(".prisma/client").DailyGoals;
    }>;
}
