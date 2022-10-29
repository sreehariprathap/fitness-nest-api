import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { TodoDto } from './dto/todo.dto';
export declare class TodosService {
    private prisma;
    private config;
    constructor(prisma: PrismaService, config: ConfigService);
    addTodo(dto: TodoDto): Promise<{
        todo: import(".prisma/client").Todos;
    }>;
    getTodaysTodos(id: number): Promise<{
        todasTodos: import(".prisma/client").Todos[];
    }>;
    getAllTodos(id: number): Promise<{
        todos: import(".prisma/client").Todos[];
    }>;
    markAsDone(id: number): Promise<{
        todo: import(".prisma/client").Todos;
    }>;
}
