import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { FoodModule } from './food/food.module';
import { WorkoutModule } from './workout/workout.module';
import { GoalsModule } from './goals/goals.module';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    PrismaModule,
    FoodModule,
    WorkoutModule,
    GoalsModule,
    TodosModule,
  ],
})
export class AppModule {}
