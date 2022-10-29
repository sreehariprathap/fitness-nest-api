"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkoutModule = void 0;
const common_1 = require("@nestjs/common");
const workout_controller_1 = require("./workout.controller");
const workout_service_1 = require("./workout.service");
let WorkoutModule = class WorkoutModule {
};
WorkoutModule = __decorate([
    (0, common_1.Module)({
        controllers: [workout_controller_1.WorkoutController],
        providers: [workout_service_1.WorkoutService]
    })
], WorkoutModule);
exports.WorkoutModule = WorkoutModule;
//# sourceMappingURL=workout.module.js.map