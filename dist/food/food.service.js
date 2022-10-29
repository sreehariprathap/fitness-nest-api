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
exports.FoodService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const runtime_1 = require("@prisma/client/runtime");
const prisma_service_1 = require("../prisma/prisma.service");
let FoodService = class FoodService {
    constructor(prisma, config) {
        this.prisma = prisma;
        this.config = config;
    }
    async addFoodIntake(dto) {
        try {
            const foodIntake = await this.prisma.foodIntake.create({
                data: {
                    userId: dto.userId,
                    calories: dto.calories,
                    foodItem: dto.foodIntake,
                },
            });
            return { foodIntake };
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
    async getFoodIntakes(id) {
        const date = new Date();
        const previous = new Date(date.getTime());
        previous.setDate(date.getDate() - 1);
        const foodIntake = await this.prisma.foodIntake.findMany({
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
        return { foodIntake };
    }
    async getCaloriesConsumedToday(id) {
        const date = new Date();
        const previous = new Date(date.getTime());
        previous.setDate(date.getDate() - 1);
        let consumedCalories = 0;
        const foodIntake = await this.prisma.foodIntake.findMany({
            where: {
                userId: {
                    equals: +id,
                },
                createAt: {
                    gt: previous,
                },
            },
        });
        foodIntake.forEach((food) => {
            consumedCalories += +food.calories;
        });
        return { consumedCalories };
    }
};
FoodService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, config_1.ConfigService])
], FoodService);
exports.FoodService = FoodService;
//# sourceMappingURL=food.service.js.map