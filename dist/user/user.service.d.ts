import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config/dist/config.service';
import { UserDto } from 'src/auth/dto';
export declare class UserService {
    private prisma;
    private config;
    constructor(prisma: PrismaService, config: ConfigService);
    getUsers(): Promise<import(".prisma/client").User[]>;
    getuserDetails(dto: UserDto): Promise<{
        user: import(".prisma/client").User;
        fitness: import(".prisma/client").Fitness;
    }>;
}
