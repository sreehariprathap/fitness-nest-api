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
exports.GoalsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const runtime_1 = require("@prisma/client/runtime");
const prisma_service_1 = require("../prisma/prisma.service");
let GoalsService = class GoalsService {
    constructor(prisma, config) {
        this.prisma = prisma;
        this.config = config;
    }
    async addGoal(dto) {
        try {
            const goal = await this.prisma.goals.create({
                data: {
                    userId: dto.userId,
                    title: dto.title,
                    description: dto.description,
                    year: dto.year,
                    status: dto.status,
                },
            });
            return { goal };
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
    async getAllGoals(id) {
        const goals = await this.prisma.goals.findMany({
            where: {
                userId: {
                    equals: +id,
                },
            },
        });
        return { goals };
    }
    async changeStatus(id, status) {
        const goal = await this.prisma.goals.update({
            where: {
                id: +id,
            },
            data: {
                status: status,
            },
        });
        return { goal };
    }
    async dailyGoalsStatusChange(id, action) {
        if (action === 'workoutGoal') {
            const goal = await this.prisma.dailyGoals.update({
                where: {
                    id: +id,
                },
                data: {
                    burnGoalStatus: true,
                },
            });
            return { goal };
        }
        else if (action === 'intakeGoal') {
            const goal = await this.prisma.dailyGoals.update({
                where: {
                    id: +id,
                },
                data: {
                    inTakeGoalStatus: true,
                },
            });
            return { goal };
        }
        throw new common_1.ForbiddenException('invalid parameters');
    }
    async getDailyGoals(id) {
        const goal = await this.prisma.dailyGoals.findMany({
            where: {
                userId: +id,
            },
        });
        return { goal };
    }
    async addWater(id, action) {
        const dailyGoals = await this.prisma.dailyGoals.findUnique({
            where: {
                id: +id,
            },
        });
        if (action === 'add') {
            if (dailyGoals.waterCount >= dailyGoals.waterGoal) {
                const status = await this.prisma.dailyGoals.update({
                    where: {
                        id: +id,
                    },
                    data: {
                        waterGoalStatus: true,
                    },
                });
            }
            const waterCount = await this.prisma.dailyGoals.update({
                where: {
                    id: +id,
                },
                data: {
                    waterCount: { increment: 1 },
                },
            });
            return { waterCount };
        }
        else if (action === 'subtract' && dailyGoals.waterCount > 0) {
            if (dailyGoals.waterCount <= dailyGoals.waterGoal) {
                const status = await this.prisma.dailyGoals.update({
                    where: {
                        id: +id,
                    },
                    data: {
                        waterGoalStatus: false,
                    },
                });
            }
            const waterCount = await this.prisma.dailyGoals.update({
                where: {
                    id: +id,
                },
                data: {
                    waterCount: { decrement: 1 },
                },
            });
            return { waterCount };
        }
        throw new common_1.ForbiddenException('water cant be subtracted');
    }
};
GoalsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, config_1.ConfigService])
], GoalsService);
exports.GoalsService = GoalsService;
//# sourceMappingURL=goals.service.js.map