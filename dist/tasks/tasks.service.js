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
var TasksService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const prisma_service_1 = require("../prisma/prisma.service");
let TasksService = TasksService_1 = class TasksService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(TasksService_1.name);
    }
    async resetDailyGoals() {
        await this.prisma.dailyGoals.updateMany({
            data: {
                inTakeGoalStatus: false,
                burnGoalStatus: false,
                waterGoalStatus: false,
                inTakeGoalCount: 0,
                burnGoalCount: 0,
                waterCount: 0,
            },
        });
    }
};
__decorate([
    (0, schedule_1.Cron)('* 59 23 * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TasksService.prototype, "resetDailyGoals", null);
TasksService = TasksService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TasksService);
exports.TasksService = TasksService;
//# sourceMappingURL=tasks.service.js.map