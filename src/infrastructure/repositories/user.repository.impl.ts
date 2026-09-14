import { CreateUserDto, LoginUserDto, PaginationDto, UpdateUserDto, UserDatasource, UserEntity, UserRepository } from "../../domain/index.js";

export class UserRepositoryImpl implements UserRepository {

    constructor(private readonly userDatasource: UserDatasource) { };

    async login(dto: LoginUserDto): Promise<UserEntity> {
        return this.userDatasource.login(dto);
    };

    async register(dto: CreateUserDto): Promise<UserEntity> {
        return this.userDatasource.register(dto);
    };

    async updateEmailValidationStatus(email: string): Promise<boolean> {
        return this.userDatasource.validateEmail(email);
    };

    async findByEmail(email: string): Promise<UserEntity | null> {
        return this.userDatasource.findByEmail(email);
    };

    async getUsers(dto: PaginationDto): Promise<{ users: UserEntity[], total: number }> {
        return this.userDatasource.getUsers(dto);
    };

    async getUserById(userID: string): Promise<UserEntity> {
        return this.userDatasource.getUserById(userID);
    };

    async updateUser(dto: UpdateUserDto, userID: string): Promise<UserEntity> {
        return this.userDatasource.updateUser(dto, userID);
    };

};