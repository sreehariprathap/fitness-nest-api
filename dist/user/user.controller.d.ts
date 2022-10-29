import { User } from '@prisma/client';
import { UserDto } from 'src/auth/dto';
import { UserService } from './user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getMe(user: User): User;
    getuserDetails(dto: UserDto): Promise<{
        user: User;
        fitness: import(".prisma/client").Fitness;
    }>;
}
