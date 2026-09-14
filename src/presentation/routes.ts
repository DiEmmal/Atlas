import { Router } from "express";
import { AuthRoutes } from "./auth/routes.js";
import { PostsRoutes } from "./posts/routes.js";
import { UsersRoutes } from "./users/routes.js";


export class AppRoutes {

    get routes() {
        const router = Router();

        router.use('/api/auth', AuthRoutes.routes);
        router.use('/api/posts', PostsRoutes.routes);
        router.use('/api/users', UsersRoutes.routes);

        return router;
    };

};