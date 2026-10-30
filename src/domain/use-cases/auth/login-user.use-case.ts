import { LoginUserDto } from "../../dtos/index.js";
import { CustomHttpError } from "../../errors/custom-http.error.js";
import { UserRepository } from "../../repositories/user.repository.js";
import { AuthService } from "../../services/index.js";
import type { PublicUser } from "../../interfaces/public-user.js";

export class LoginUserUseCase { 

    constructor(
        private readonly userRepository: UserRepository,
        private readonly authService: AuthService
    ){};

    async execute(dto: LoginUserDto): Promise<{ user: PublicUser, token: string }> {
        const user = await this.userRepository.login(dto);

        if(user.emailValidated === false) throw CustomHttpError.unauthorized('User email is not validated yet');

        const validated = await this.authService.compare(dto.password, user.password);
        if(!validated) throw CustomHttpError.unauthorized('Invalid password');

        if(!user.emailValidated) throw CustomHttpError.forbidden('Email not validated');
        
        const token = await this.authService.generateJWT({ email: user.email, id: user.id }, 3600);
        if(!token) throw CustomHttpError.internalServerError('Error generating token');

        return { user: user.toPublicUser(), token };

    };

};