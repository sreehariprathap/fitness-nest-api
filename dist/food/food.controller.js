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
exports.FoodController = void 0;
const common_1 = require("@nestjs/common");
const food_dto_1 = require("./dto/food.dto");
const food_service_1 = require("./food.service");
let FoodController = class FoodController {
    constructor(foodService) {
        this.foodService = foodService;
    }
    addFoodIntake(dto) {
        return this.foodService.addFoodIntake(dto);
    }
    getFoodIntakes(dto) {
        return this.foodService.getFoodIntakes(dto.id);
    }
    getCaloriesConsumedToday(dto) {
        return this.foodService.getCaloriesConsumedToday(dto.id);
    }
};
__decorate([
    (0, common_1.Post)('food-intake'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [food_dto_1.FoodDto]),
    __metadata("design:returntype", void 0)
], FoodController.prototype, "addFoodIntake", null);
__decorate([
    (0, common_1.Post)('food-intake/today'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FoodController.prototype, "getFoodIntakes", null);
__decorate([
    (0, common_1.Post)('calories/today'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FoodController.prototype, "getCaloriesConsumedToday", null);
FoodController = __decorate([
    (0, common_1.Controller)('food'),
    __metadata("design:paramtypes", [food_service_1.FoodService])
], FoodController);
exports.FoodController = FoodController;
//# sourceMappingURL=food.controller.js.map