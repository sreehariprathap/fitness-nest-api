/// <reference types="node" />
import { AuthService } from './auth.service';
import { AuthDto, SignUpDto, UserDto } from './dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signUp(dto: AuthDto): Promise<typeof import("assert").ok>;
    signUpUser(dto: SignUpDto): Promise<{
        user: import(".prisma/client").User;
    }>;
    signIn(dto: AuthDto): Promise<{
        access_token: string;
    }>;
    getUsers(): Promise<import(".prisma/client").User[]>;
    getuserDetails(dto: UserDto): Promise<{
        user: import(".prisma/client").User;
        fitness: import(".prisma/client").Fitness;
    }>;
}
