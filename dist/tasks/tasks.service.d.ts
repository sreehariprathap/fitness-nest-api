import { PrismaService } from 'src/prisma/prisma.service';
export declare class TasksService {
    private prisma;
    constructor(prisma: PrismaService);
    private readonly logger;
    resetDailyGoals(): Promise<void>;
}
