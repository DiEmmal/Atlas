import { CreateUserDto } from "../../dtos/index.js";
import { CustomHttpError } from "../../errors/custom-http.error.js";
import { UserRepository } from "../../repositories/user.repository.js";
import { AuthService } from "../../services/index.js";
import type { PublicUser } from "../../interfaces/public-user.js";

export class RegisterUserUseCase { 

    constructor(
        private readonly userRepository: UserRepository,
        private readonly authService: AuthService
    ){};

    async execute(dto: CreateUserDto): Promise<PublicUser> {
        let {email, name, password} = dto;
        
        const existingUser = await this.userRepository.findByEmail(email);
        
        if(existingUser) throw CustomHttpError.conflict(`User with ${email} already exists`);
        
        await this.authService.sendValidationEmailLink(email);

        password = await this.authService.hash(password);
        
        const user = await this.userRepository.register({
            email,
            name,
            password
        });

        return user.toPublicUser();

    };

};