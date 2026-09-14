import type { UpdateUserDto } from "../../dtos/index.js";
import { UserEntity } from "../../entities/user.entity.js";
import type { UserRepository } from "../../repositories/user.repository.js";

export class UpdateUserUseCase {

    constructor(
        private readonly userRepository: UserRepository,
    ) { };

    async execute(dto: UpdateUserDto, userID: string): Promise<UserEntity> {
        return this.userRepository.updateUser(dto, userID);
    };

};