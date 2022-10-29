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
exports.TodosController = void 0;
const common_1 = require("@nestjs/common");
const todo_dto_1 = require("./dto/todo.dto");
const todos_service_1 = require("./todos.service");
let TodosController = class TodosController {
    constructor(todoService) {
        this.todoService = todoService;
    }
    addTodo(dto) {
        return this.todoService.addTodo(dto);
    }
    getFoodIntakes(dto) {
        return this.todoService.getAllTodos(dto.id);
    }
    getTodaysTodos(dto) {
        return this.todoService.getTodaysTodos(dto.id);
    }
    markAsDone(dto) {
        return this.todoService.markAsDone(dto.id);
    }
};
__decorate([
    (0, common_1.Post)('todo'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [todo_dto_1.TodoDto]),
    __metadata("design:returntype", void 0)
], TodosController.prototype, "addTodo", null);
__decorate([
    (0, common_1.Post)('all-todos'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TodosController.prototype, "getFoodIntakes", null);
__decorate([
    (0, common_1.Post)('today'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TodosController.prototype, "getTodaysTodos", null);
__decorate([
    (0, common_1.Post)('mark-as-done'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TodosController.prototype, "markAsDone", null);
TodosController = __decorate([
    (0, common_1.Controller)('todos'),
    __metadata("design:paramtypes", [todos_service_1.TodosService])
], TodosController);
exports.TodosController = TodosController;
//# sourceMappingURL=todos.controller.js.map