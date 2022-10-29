/// <reference types="node" />
import { AuthDto, SignUpDto, UserDto } from './dto';
import { JwtService } from '@nestjs/jwt/dist';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config/dist/config.service';
import { ok } from 'assert';
export declare class AuthService {
    private prisma;
    private jwt;
    private config;
    constructor(prisma: PrismaService, jwt: JwtService, config: ConfigService);
    signUp(dto: AuthDto): Promise<typeof ok>;
    signUpUser(dto: SignUpDto): Promise<{
        user: import(".prisma/client").User;
    }>;
    signIn(dto: AuthDto): Promise<{
        access_token: string;
    }>;
    signToken(userId: number, email: string): Promise<{
        access_token: string;
        userId: number;
        email: string;
    }>;
    getUsers(): Promise<import(".prisma/client").User[]>;
    getuserDetails(dto: UserDto): Promise<{
        user: import(".prisma/client").User;
        fitness: import(".prisma/client").Fitness;
    }>;
    bmi(weight: number, height: number): string;
    bmr(weight: number, height: number, dateOfBirth: string, gender?: string): string | number;
    getAge(dateString: any): number;
    waterIntakeCalculator(weight: number): number;
}
