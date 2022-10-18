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

  @Get('food-intake/:id')
  getFoodIntakes(@Param() params) {
    return this.foodService.getFoodIntakes(params.id);
  }
}
