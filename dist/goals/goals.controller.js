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
exports.GoalsController = void 0;
const common_1 = require("@nestjs/common");
const goal_dto_1 = require("./dto/goal.dto");
const goals_service_1 = require("./goals.service");
let GoalsController = class GoalsController {
    constructor(goalService) {
        this.goalService = goalService;
    }
    addTodo(dto) {
        return this.goalService.addGoal(dto);
    }
    getFoodIntakes(dto) {
        return this.goalService.getAllGoals(dto.id);
    }
    markAsDone(dto) {
        return this.goalService.changeStatus(dto.id, dto.status);
    }
    getDailyGoals(dto) {
        return this.goalService.getDailyGoals(dto.id);
    }
    addWater(dto) {
        return this.goalService.addWater(dto.id, dto.action);
    }
    dailyGoalsStatusChange(dto) {
        return this.goalService.dailyGoalsStatusChange(dto.id, dto.action);
    }
};
__decorate([
    (0, common_1.Post)('goal'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [goal_dto_1.GoalDto]),
    __metadata("design:returntype", void 0)
], GoalsController.prototype, "addTodo", null);
__decorate([
    (0, common_1.Post)('all-goals'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], GoalsController.prototype, "getFoodIntakes", null);
__decorate([
    (0, common_1.Patch)('change-Status'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], GoalsController.prototype, "markAsDone", null);
__decorate([
    (0, common_1.Post)('daily-goals'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], GoalsController.prototype, "getDailyGoals", null);
__decorate([
    (0, common_1.Patch)('add-water'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], GoalsController.prototype, "addWater", null);
__decorate([
    (0, common_1.Patch)('daily-goals/change-Status'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], GoalsController.prototype, "dailyGoalsStatusChange", null);
GoalsController = __decorate([
    (0, common_1.Controller)('goals'),
    __metadata("design:paramtypes", [goals_service_1.GoalsService])
], GoalsController);
exports.GoalsController = GoalsController;
//# sourceMappingURL=goals.controller.js.map