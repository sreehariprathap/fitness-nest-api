import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { FoodDto } from './dto/food.dto';
export declare class FoodService {
    private prisma;
    private config;
    constructor(prisma: PrismaService, config: ConfigService);
    addFoodIntake(dto: FoodDto): Promise<{
        foodIntake: import(".prisma/client").FoodIntake;
    }>;
    getFoodIntakes(id: number): Promise<{
        foodIntake: import(".prisma/client").FoodIntake[];
    }>;
    getCaloriesConsumedToday(id: number): Promise<{
        consumedCalories: number;
    }>;
}
