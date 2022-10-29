import { WeightDto } from './dto/weight.dto';
import { WorkOutDto } from './dto/workout.dto';
import { WorkoutService } from './workout.service';
export declare class WorkoutController {
    private workoutService;
    constructor(workoutService: WorkoutService);
    addWorkout(dto: WorkOutDto): Promise<{
        workout: import(".prisma/client").WorkOut;
    }>;
    getWorkouts(dto: {
        id: number;
    }): Promise<{
        workout: import(".prisma/client").WorkOut[];
    }>;
    getCaloriesBurned(dto: {
        id: number;
    }): Promise<{
        burnedCalories: number;
    }>;
    addWeight(dto: WeightDto): Promise<{
        weight: import(".prisma/client").Weights;
    }>;
    getWeightHistory(dto: {
        id: number;
    }): Promise<{
        weights: {
            weight: number;
            createAt: Date;
        }[];
    }>;
    getWorkoutHeatMap(dto: {
        id: number;
        date: string;
    }): Promise<{
        workouts: {
            createAt: Date;
            caloriesBurned: string;
        }[];
    }>;
}
