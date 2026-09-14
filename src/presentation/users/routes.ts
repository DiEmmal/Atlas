import { Router } from "express";
import { UserController } from "./controller.js";
import type { UserRepository } from "../../domain/index.js";
import type { AuthMiddleware } from "../middlewares/auth.middleware.js";

export class UsersRoutes {

    constructor(
        private readonly userRepository: UserRepository,
        private readonly authMiddleware: AuthMiddleware,
    ) { };

    public routes(): Router {

        const router = Router();

        const controller = new UserController(this.userRepository);

        router.get('/', controller.getUsers);
        router.get('/:userID', controller.getUserById);
        router.put('/:userID', [this.authMiddleware.validateJWT], controller.updateUser);

        return router;

    };

}