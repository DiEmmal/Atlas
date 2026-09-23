import { Router } from "express";
import { UserController } from "./controller.js";
import type { UserRepository } from "../../domain/index.js";
import type { ImageService } from "../../domain/index.js";
import type { ErrorService } from "../services/error.service.js";
import type { AuthMiddleware } from "../middlewares/auth.middleware.js";

export class UsersRoutes {

    constructor(
        private readonly userRepository: UserRepository,
        private readonly authMiddleware: AuthMiddleware,
        private readonly imageService: ImageService,
        private readonly errorService: ErrorService,
    ) { };

    public routes(): Router {

        const router = Router();

        const controller = new UserController(this.userRepository, this.imageService, this.errorService);

        router.get('/', controller.getUsers);
        router.get('/image/:fileName', controller.getUserImage);
        router.get('/:userID', controller.getUserById);
        router.put('/:userID', [this.authMiddleware.validateJWT], controller.updateUser);

        return router;

    };

}