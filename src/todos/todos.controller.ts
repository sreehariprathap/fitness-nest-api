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

  @Post('all-todos')
  getFoodIntakes(@Body() dto: { id: number }) {
    return this.todoService.getAllTodos(dto.id);
  }

  @Post('today')
  getTodaysTodos(@Body() dto: { id: number }) {
    return this.todoService.getTodaysTodos(dto.id);
  }

  @Post('mark-as-done')
  markAsDone(@Body() dto: { id: number }) {
    return this.todoService.markAsDone(dto.id);
  }
}
