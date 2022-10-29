import { FoodDto } from './dto/food.dto';
import { FoodService } from './food.service';
export declare class FoodController {
    private foodService;
    constructor(foodService: FoodService);
    addFoodIntake(dto: FoodDto): Promise<{
        foodIntake: import(".prisma/client").FoodIntake;
    }>;
    getFoodIntakes(dto: {
        id: number;
    }): Promise<{
        foodIntake: import(".prisma/client").FoodIntake[];
    }>;
    getCaloriesConsumedToday(dto: {
        id: number;
    }): Promise<{
        consumedCalories: number;
    }>;
}
