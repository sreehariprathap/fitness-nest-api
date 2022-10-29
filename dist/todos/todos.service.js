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
exports.TodosService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const runtime_1 = require("@prisma/client/runtime");
const prisma_service_1 = require("../prisma/prisma.service");
let TodosService = class TodosService {
    constructor(prisma, config) {
        this.prisma = prisma;
        this.config = config;
    }
    async addTodo(dto) {
        try {
            const todo = await this.prisma.todos.create({
                data: {
                    userId: dto.userId,
                    title: dto.title,
                    description: dto.description,
                    date: new Date(dto.date),
                    status: dto.status,
                },
            });
            return { todo };
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
    async getTodaysTodos(id) {
        const date = new Date();
        const previous = new Date(date.getTime());
        previous.setDate(date.getDate() - 1);
        const todasTodos = await this.prisma.todos.findMany({
            where: {
                userId: {
                    equals: +id,
                },
                date: {
                    gte: previous,
                },
            },
        });
        return { todasTodos };
    }
    async getAllTodos(id) {
        const todos = await this.prisma.todos.findMany({
            where: {
                userId: {
                    equals: +id,
                },
            },
        });
        return { todos };
    }
    async markAsDone(id) {
        const todo = await this.prisma.todos.update({
            where: {
                id: +id,
            },
            data: {
                status: false,
            },
        });
        return { todo };
    }
};
TodosService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, config_1.ConfigService])
], TodosService);
exports.TodosService = TodosService;
//# sourceMappingURL=todos.service.js.map