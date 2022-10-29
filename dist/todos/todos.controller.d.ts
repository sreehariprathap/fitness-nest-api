import { TodoDto } from './dto/todo.dto';
import { TodosService } from './todos.service';
export declare class TodosController {
    private todoService;
    constructor(todoService: TodosService);
    addTodo(dto: TodoDto): Promise<{
        todo: import(".prisma/client").Todos;
    }>;
    getFoodIntakes(dto: {
        id: number;
    }): Promise<{
        todos: import(".prisma/client").Todos[];
    }>;
    getTodaysTodos(dto: {
        id: number;
    }): Promise<{
        todasTodos: import(".prisma/client").Todos[];
    }>;
    markAsDone(dto: {
        id: number;
    }): Promise<{
        todo: import(".prisma/client").Todos;
    }>;
}
