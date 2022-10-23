import { Body, Controller, Post } from '@nestjs/common';
import { GoalDto } from './dto/goal.dto';
import { GoalsService } from './goals.service';

@Controller('goals')
export class GoalsController {
  constructor(private goalService: GoalsService) {}

  @Post('goal')
  addTodo(@Body() dto: GoalDto) {
    return this.goalService.addGoal(dto);
  }

  @Post('all-goals')
  getFoodIntakes(@Body() dto: { id: number }) {
    return this.goalService.getAllGoals(dto.id);
  }
}
