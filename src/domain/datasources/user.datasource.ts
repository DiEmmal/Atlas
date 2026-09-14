import type { CreateUserDto, LoginUserDto, PaginationDto, UpdateUserDto } from "../dtos/index.js";
import type { UserEntity } from "../entities/user.entity.js";

export abstract class UserDatasource {
    abstract register(dto: CreateUserDto): Promise<UserEntity>;
    abstract login(dto: LoginUserDto): Promise<UserEntity>;
    abstract validateEmail(email: string): Promise<boolean>;
    abstract findByEmail(email: string): Promise<UserEntity | null>;
    abstract getUsers(dto: PaginationDto): Promise<{ users: UserEntity[], total: number }>;
    abstract getUserById(userID: string): Promise<UserEntity>;
    abstract updateUser(dto: UpdateUserDto, userID: string): Promise<UserEntity>;
};