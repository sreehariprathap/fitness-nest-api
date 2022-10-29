import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { WeightDto } from './dto/weight.dto';
import { WorkOutDto } from './dto/workout.dto';
export declare class WorkoutService {
    private prisma;
    private config;
    constructor(prisma: PrismaService, config: ConfigService);
    addWorkout(dto: WorkOutDto): Promise<{
        workout: import(".prisma/client").WorkOut;
    }>;
    getWorkouts(id: number): Promise<{
        workout: import(".prisma/client").WorkOut[];
    }>;
    getCaloriesBurned(id: number): Promise<{
        burnedCalories: number;
    }>;
    addWeight(dto: WeightDto): Promise<{
        weight: import(".prisma/client").Weights;
    }>;
    getWeightHistory(id: number): Promise<{
        weights: {
            weight: number;
            createAt: Date;
        }[];
    }>;
    getWorkoutHeatMap(id: number, date: string): Promise<{
        workouts: {
            createAt: Date;
            caloriesBurned: string;
        }[];
    }>;
}
