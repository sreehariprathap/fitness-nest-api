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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkoutController = void 0;
const common_1 = require("@nestjs/common");
const weight_dto_1 = require("./dto/weight.dto");
const workout_dto_1 = require("./dto/workout.dto");
const workout_service_1 = require("./workout.service");
let WorkoutController = class WorkoutController {
    constructor(workoutService) {
        this.workoutService = workoutService;
    }
    addWorkout(dto) {
        return this.workoutService.addWorkout(dto);
    }
    getWorkouts(dto) {
        return this.workoutService.getWorkouts(dto.id);
    }
    getCaloriesBurned(dto) {
        return this.workoutService.getCaloriesBurned(dto.id);
    }
    addWeight(dto) {
        return this.workoutService.addWeight(dto);
    }
    getWeightHistory(dto) {
        return this.workoutService.getWeightHistory(dto.id);
    }
    getWorkoutHeatMap(dto) {
        return this.workoutService.getWorkoutHeatMap(dto.id, dto.date);
    }
};
__decorate([
    (0, common_1.Post)('add-workout'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [workout_dto_1.WorkOutDto]),
    __metadata("design:returntype", void 0)
], WorkoutController.prototype, "addWorkout", null);
__decorate([
    (0, common_1.Post)('daily-workout'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WorkoutController.prototype, "getWorkouts", null);
__decorate([
    (0, common_1.Post)('calories/today'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WorkoutController.prototype, "getCaloriesBurned", null);
__decorate([
    (0, common_1.Post)('weight'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [weight_dto_1.WeightDto]),
    __metadata("design:returntype", void 0)
], WorkoutController.prototype, "addWeight", null);
__decorate([
    (0, common_1.Post)('weight-history'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WorkoutController.prototype, "getWeightHistory", null);
__decorate([
    (0, common_1.Post)('workout-heatmap'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WorkoutController.prototype, "getWorkoutHeatMap", null);
WorkoutController = __decorate([
    (0, common_1.Controller)('workouts'),
    __metadata("design:paramtypes", [workout_service_1.WorkoutService])
], WorkoutController);
exports.WorkoutController = WorkoutController;
//# sourceMappingURL=workout.controller.js.map