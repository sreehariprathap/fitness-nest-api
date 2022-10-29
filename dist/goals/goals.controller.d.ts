import { GoalDto } from './dto/goal.dto';
import { GoalsService } from './goals.service';
export declare class GoalsController {
    private goalService;
    constructor(goalService: GoalsService);
    addTodo(dto: GoalDto): Promise<{
        goal: import(".prisma/client").Goals;
    }>;
    getFoodIntakes(dto: {
        id: number;
    }): Promise<{
        goals: import(".prisma/client").Goals[];
    }>;
    markAsDone(dto: {
        id: number;
        status: string;
    }): Promise<{
        goal: import(".prisma/client").Goals;
    }>;
    getDailyGoals(dto: {
        id: number;
    }): Promise<{
        goal: import(".prisma/client").DailyGoals[];
    }>;
    addWater(dto: {
        id: number;
        action: 'add';
    }): Promise<{
        waterCount: import(".prisma/client").DailyGoals;
    }>;
    dailyGoalsStatusChange(dto: {
        id: number;
        action: string;
    }): Promise<{
        goal: import(".prisma/client").DailyGoals;
    }>;
}
