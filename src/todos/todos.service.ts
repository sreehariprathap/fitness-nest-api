import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import { TodoDto } from './dto/todo.dto';

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService, private config: ConfigService) {}

  async addTodo(dto: TodoDto) {
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
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('something went wrong');
        }
      }
      throw error;
    }
  }

  async getTodaysTodos(id: number) {
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
          lt: date,
        },
      },
    });
    return { todasTodos };
  }

  async getAllTodos(id: number) {
    const todos = await this.prisma.todos.findMany({
      where: {
        userId: {
          equals: +id,
        },
      },
    });
    return { todos };
  }
}
