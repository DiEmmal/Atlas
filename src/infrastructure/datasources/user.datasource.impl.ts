import { CreateUserDto, LoginUserDto, UserDatasource, UserEntity, CustomHttpError } from "../../domain/index.js";
import type { PaginationDto, UpdateUserDto } from "../../domain/index.js";
import { UserModel } from "../data/mongo/models/user.model.js";

export class UserDatasourceImpl implements UserDatasource {

    public async register(dto: CreateUserDto): Promise<UserEntity> {

        const { email, password, name } = dto;

        const newUserEntity = new UserEntity(
            name,
            email,
            password,
        );

        const user = await UserModel.create(newUserEntity);

        return UserEntity.fromObject(user);

    };

    public async login(dto: LoginUserDto): Promise<UserEntity> {

        const { email } = dto;

        const user = await UserModel.findOne({ email });

        if (!user) throw CustomHttpError.notFound('User not found');

        return UserEntity.fromObject(user);

    };

    public async validateEmail(email: string): Promise<boolean> {

        const user = await UserModel.findOne({ email });
        if (!user) throw CustomHttpError.notFound('User not found');

        user.emailValidated = true;
        await user.save();

        return true;
    };

    public async findByEmail(email: string): Promise<UserEntity | null> {

        const user = await UserModel.findOne({ email });
        if (!user) return null;

        return UserEntity.fromObject(user);

    };

    public async getUsers(dto: PaginationDto): Promise<{ users: UserEntity[], total: number }> {

        const { page, limit } = dto;

        try {
            const [total, users] = await Promise.all([
                UserModel.countDocuments(),
                UserModel.find()
                    .skip((page - 1) * limit)
                    .limit(limit)
            ]);

            if (!users || users.length === 0) return { users: [], total };

            return {
                users: users.map(user => UserEntity.fromObject(user)),
                total
            };

        } catch (error) {
            if (error instanceof CustomHttpError) throw error;
            throw CustomHttpError.internalServerError('Unable to retrieve users');
        };
    };

    public async getUserById(userID: string): Promise<UserEntity> {

        try {
            const user = await UserModel.findOne({ id: userID });

            if (!user) throw CustomHttpError.notFound('User not found');

            return UserEntity.fromObject(user);

        } catch (error) {
            if (error instanceof CustomHttpError) throw error;
            throw CustomHttpError.internalServerError('Unable to retrieve user');
        };

    };

    public async updateUser(dto: UpdateUserDto, userID: string): Promise<UserEntity> {

        try {
            const updateData: { name?: string; password?: string; img?: string } = {};

            if (dto.name !== undefined) updateData.name = dto.name;
            if (dto.password !== undefined) updateData.password = dto.password;
            if (dto.img !== undefined) updateData.img = dto.img;

            const user = await UserModel.findOneAndUpdate(
                { id: userID },
                updateData,
                { returnDocument: 'after' },
            );

            if (!user) throw CustomHttpError.notFound('User not found');

            return UserEntity.fromObject(user);

        } catch (error) {
            if (error instanceof CustomHttpError) throw error;
            throw CustomHttpError.internalServerError('Unable to update user');
        };

    };

};