import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FoodDto } from './dto/food.dto';
import { FoodService } from './food.service';

@Controller('food')
export class FoodController {
  constructor(private foodService: FoodService) {}

  @Post('food-intake')
  addFoodIntake(@Body() dto: FoodDto) {
    return this.foodService.addFoodIntake(dto);
  }

  @Post('food-intake/today')
  getFoodIntakes(@Body() dto: { id: number }) {
    return this.foodService.getFoodIntakes(dto.id);
  }

  @Post('calories/today')
  getCaloriesConsumedToday(@Body() dto: { id: number }) {
    return this.foodService.getCaloriesConsumedToday(dto.id);
  }
}
