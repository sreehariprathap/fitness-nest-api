import { Body, Controller, Post } from '@nestjs/common';
import { TodoDto } from './dto/todo.dto';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private todoService: TodosService) {}

  @Post('todo')
  addTodo(@Body() dto: TodoDto) {
    return this.todoService.addTodo(dto);
  }

  @Post('allTodos')
  getFoodIntakes(@Body() dto: { id: number }) {
    return this.todoService.getAllTodos(dto.id);
  }

  @Post('today')
  getCaloriesConsumedToday(@Body() dto: { id: number }) {
    return this.todoService.getTodaysTodos(dto.id);
  }
}
