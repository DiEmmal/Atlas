import type { PublicUser } from "../../interfaces/public-user.js";
import type { UserRepository } from "../../repositories/user.repository.js";

export class GetUserByIdUseCase {

    constructor(private readonly userRepository: UserRepository) { };

    async execute(userID: string): Promise<PublicUser> {
        const user = await this.userRepository.getUserById(userID);
        return user.toPublicUser();
    };

};
