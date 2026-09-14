import { Router } from "express";
import { UserController } from "./controller.js";
import { AuthServiceImpl, EmailServiceImpl, UserDatasourceImpl, UserRepositoryImpl } from "../../infrastructure/index.js";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";

export class UsersRoutes {

    static get routes(): Router {

        const router = Router();

        const datasource = new UserDatasourceImpl();
        const repository = new UserRepositoryImpl(datasource);

        const controller = new UserController(repository);

        const authMiddleware = new AuthMiddleware(
            repository,
            new AuthServiceImpl(new EmailServiceImpl())
        );

        router.get('/', controller.getUsers);
        router.get('/:userID', controller.getUserById);
        router.put('/:userID', [authMiddleware.validateJWT], controller.updateUser);

        return router;

    };

}