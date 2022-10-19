import { Body, Controller, Post } from '@nestjs/common';
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
}
