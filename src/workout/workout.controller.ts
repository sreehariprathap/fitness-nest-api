import { Body, Controller, Post } from '@nestjs/common';
import { WeightDto } from './dto/weight.dto';
import { WorkOutDto } from './dto/workout.dto';
import { WorkoutService } from './workout.service';

@Controller('workouts')
export class WorkoutController {
  constructor(private workoutService: WorkoutService) {}

  @Post('add-workout')
  addWorkout(@Body() dto: WorkOutDto) {
    return this.workoutService.addWorkout(dto);
  }

  @Post('daily-workout')
  getWorkouts(@Body() dto: { id: number }) {
    return this.workoutService.getWorkouts(dto.id);
  }

  @Post('calories/today')
  getCaloriesBurned(@Body() dto: { id: number }) {
    return this.workoutService.getCaloriesBurned(dto.id);
  }

  @Post('weight')
  addWeight(@Body() dto: WeightDto) {
    return this.workoutService.addWeight(dto);
  }

  @Post('weight-history')
  getWeightHistory(@Body() dto: { id: number }) {
    return this.workoutService.getWeightHistory(dto.id);
  }

  @Post('workout-heatmap')
  getWorkoutHeatMap(@Body() dto: { id: number; date: string }) {
    return this.workoutService.getWorkoutHeatMap(dto.id, dto.date);
  }
}
