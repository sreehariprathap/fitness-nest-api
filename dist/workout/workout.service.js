"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkoutService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const runtime_1 = require("@prisma/client/runtime");
const prisma_service_1 = require("../prisma/prisma.service");
let WorkoutService = class WorkoutService {
    constructor(prisma, config) {
        this.prisma = prisma;
        this.config = config;
    }
    async addWorkout(dto) {
        try {
            const workout = await this.prisma.workOut.create({
                data: {
                    userId: dto.userId,
                    caloriesBurned: dto.caloriesBurned,
                    workoutName: dto.workoutName,
                },
            });
            return { workout };
        }
        catch (error) {
            if (error instanceof runtime_1.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new common_1.ForbiddenException('something went wrong');
                }
            }
            throw error;
        }
    }
    async getWorkouts(id) {
        const date = new Date();
        const previous = new Date(date.getTime());
        previous.setDate(date.getDate() - 1);
        const workout = await this.prisma.workOut.findMany({
            where: {
                userId: {
                    equals: +id,
                },
                createAt: {
                    gte: previous,
                    lt: date,
                },
            },
        });
        return { workout };
    }
    async getCaloriesBurned(id) {
        const date = new Date();
        const previous = new Date(date.getTime());
        previous.setDate(date.getDate() - 1);
        let burnedCalories = 0;
        const calories = await this.prisma.workOut.findMany({
            where: {
                userId: {
                    equals: +id,
                },
                createAt: {
                    gt: previous,
                },
            },
        });
        calories.forEach((workOut) => {
            burnedCalories += +workOut.caloriesBurned;
        });
        return { burnedCalories };
    }
    async addWeight(dto) {
        try {
            const weight = await this.prisma.weights.create({
                data: {
                    userId: dto.userId,
                    weight: dto.weight,
                },
            });
            return { weight };
        }
        catch (error) {
            if (error instanceof runtime_1.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new common_1.ForbiddenException('something went wrong');
                }
            }
            throw error;
        }
    }
    async getWeightHistory(id) {
        const weights = await this.prisma.weights.findMany({
            orderBy: [
                {
                    createAt: 'asc',
                },
            ],
            where: {
                userId: {
                    equals: +id,
                },
            },
            select: {
                weight: true,
                createAt: true,
            },
        });
        return { weights };
    }
    async getWorkoutHeatMap(id, date) {
        const filterDate = new Date(date);
        const workouts = await this.prisma.workOut.findMany({
            orderBy: [
                {
                    createAt: 'asc',
                },
            ],
            where: {
                userId: {
                    equals: +id,
                },
                createAt: {
                    gte: filterDate,
                },
            },
            select: {
                caloriesBurned: true,
                createAt: true,
            },
        });
        return { workouts };
    }
};
WorkoutService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, config_1.ConfigService])
], WorkoutService);
exports.WorkoutService = WorkoutService;
//# sourceMappingURL=workout.service.js.map