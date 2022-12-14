import { Body, Controller, Patch, Post } from '@nestjs/common';
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

  @Patch('change-Status')
  markAsDone(@Body() dto: { id: number; status: string }) {
    return this.goalService.changeStatus(dto.id, dto.status);
  }

  @Post('daily-goals')
  getDailyGoals(@Body() dto: { id: number }) {
    return this.goalService.getDailyGoals(dto.id);
  }

  @Patch('add-water')
  addWater(@Body() dto: { id: number; action: 'add' }) {
    return this.goalService.addWater(dto.id, dto.action);
  }

  @Patch('daily-goals/change-Status')
  dailyGoalsStatusChange(@Body() dto: { id: number; action: string }) {
    return this.goalService.dailyGoalsStatusChange(dto.id, dto.action);
  }
}
