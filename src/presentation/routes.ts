import { Router } from "express";
import { AuthRoutes } from "./auth/routes.js";
import { PostsRoutes } from "./posts/routes.js";
import { UsersRoutes } from "./users/routes.js";
import { dependencies } from "./app-dependencies.js";


export class AppRoutes {

    public routes(): Router {
        const router = Router();

        const authRoutes = new AuthRoutes(
            dependencies.userRepository,
            dependencies.authService,
            dependencies.errorService,
        );

        const postsRoutes = new PostsRoutes(
            dependencies.postRepository,
            dependencies.authMiddleware,
            dependencies.imageService,
            dependencies.errorService,
        );

        const usersRoutes = new UsersRoutes(
            dependencies.userRepository,
            dependencies.authMiddleware,
            dependencies.imageService,
            dependencies.errorService,
        );

        router.use('/api/auth', authRoutes.routes());
        router.use('/api/posts', postsRoutes.routes());
        router.use('/api/users', usersRoutes.routes());

        return router;
    };

};