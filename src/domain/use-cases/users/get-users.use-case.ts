import type { PaginationDto } from "../../dtos/index.js";
import type { PublicUser } from "../../interfaces/public-user.js";
import type { UserRepository } from "../../repositories/user.repository.js";

export class GetUsersUseCase {

    constructor(private readonly userRepository: UserRepository) { };

    async execute(dto: PaginationDto): Promise<{ users: PublicUser[], total: number }> {
        const { users, total } = await this.userRepository.getUsers(dto);
        return { users: users.map(user => user.toPublicUser()), total };
    };

};
