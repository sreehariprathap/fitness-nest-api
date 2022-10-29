"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const argon = require("argon2");
const runtime_1 = require("@prisma/client/runtime");
const exceptions_1 = require("@nestjs/common/exceptions");
const dist_1 = require("@nestjs/jwt/dist");
const prisma_service_1 = require("../prisma/prisma.service");
const config_service_1 = require("@nestjs/config/dist/config.service");
const assert_1 = require("assert");
let AuthService = class AuthService {
    constructor(prisma, jwt, config) {
        this.prisma = prisma;
        this.jwt = jwt;
        this.config = config;
    }
    async signUp(dto) {
        const hash = await argon.hash(dto.password);
        try {
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash,
                    firstName: dto.firstName,
                    lastName: dto.lastName,
                },
            });
            return assert_1.ok;
        }
        catch (error) {
            if (error instanceof runtime_1.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new exceptions_1.ForbiddenException('Credentials already taken');
                }
            }
            throw error;
        }
    }
    async signUpUser(dto) {
        const hash = await argon.hash(dto.password);
        try {
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash,
                    firstName: dto.firstName,
                    lastName: dto.lastName,
                    gender: dto.gender,
                },
            });
            const fitness = await this.prisma.fitness.create({
                data: {
                    weight: dto.weight,
                    height: dto.height,
                    bmi: this.bmi(+dto.weight, +dto.height),
                    caloriesPerDay: (this.bmr(+dto.weight, +dto.height, dto.dateOfBirth, dto.gender)).toString(),
                    age: this.getAge(dto.dateOfBirth),
                    userId: user.id,
                },
            });
            const dailyGoals = await this.prisma.dailyGoals.create({
                data: {
                    userId: user.id,
                    inTakeGoal: +this.bmr(+dto.weight, +dto.height, dto.dateOfBirth, dto.gender),
                    burnGoal: 600,
                    waterGoal: this.waterIntakeCalculator(+dto.weight),
                },
            });
            return { user };
        }
        catch (error) {
            if (error instanceof runtime_1.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new exceptions_1.ForbiddenException('Credentials already taken');
                }
            }
            throw error;
        }
    }
    async signIn(dto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        });
        if (!user)
            throw new exceptions_1.ForbiddenException('User does not exist');
        const pwMatches = await argon.verify(user.hash, dto.password);
        if (!pwMatches)
            throw new exceptions_1.ForbiddenException('Password incorrect');
        return this.signToken(user.id, user.email);
    }
    async signToken(userId, email) {
        const payload = {
            sub: userId,
            email,
        };
        const secret = this.config.get('JWT_SECRET');
        const token = await this.jwt.signAsync(payload, {
            expiresIn: '15m',
            secret: secret,
        });
        return {
            access_token: token,
            userId: userId,
            email: email,
        };
    }
    async getUsers() {
        const users = await this.prisma.user.findMany();
        return users;
    }
    async getuserDetails(dto) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: dto.id,
            },
        });
        const fitness = await this.prisma.fitness.findFirst({
            where: {
                userId: dto.id,
            },
        });
        if (user != null && fitness != null) {
            return { user, fitness };
        }
        else {
            return null;
        }
    }
    bmi(weight, height) {
        return (weight / Math.pow(height * 0.01, 2)).toString();
    }
    bmr(weight, height, dateOfBirth, gender) {
        const age = this.getAge(dateOfBirth);
        if (gender == 'male') {
            return (10 * weight + 6.25 * height - 5 * age + 5).toString();
        }
        else if (gender == 'female') {
            return (10 * weight + 6.25 * height - 5 * age - 16).toString();
        }
        return Math.round(66.47 + 13.75 * weight + 5.003 * height - 6.755 * age);
    }
    getAge(dateString) {
        const today = new Date();
        const birthDate = new Date(dateString);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }
    waterIntakeCalculator(weight) {
        return Math.round(weight * 0.033);
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        dist_1.JwtService,
        config_service_1.ConfigService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map