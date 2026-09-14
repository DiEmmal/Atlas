import { Router } from "express";
import { PostsController } from "./controller.js";
import { PostDatasourceImpl, PostRepositoryImpl, UserRepositoryImpl, UserDatasourceImpl, AuthServiceImpl, EmailServiceImpl } from '../../infrastructure/index.js';
import { AuthMiddleware } from "../middlewares/auth.middleware.js";

export class PostsRoutes {

  static get routes(): Router {

    const router = Router();

    const authMiddleware = new AuthMiddleware(
      new UserRepositoryImpl(
        new UserDatasourceImpl()
      ),
      new AuthServiceImpl(
        new EmailServiceImpl()
      )
    );

    const datasource = new PostDatasourceImpl();
    const repository = new PostRepositoryImpl(datasource);

    const controller = new PostsController(repository);

    router.post('/', [authMiddleware.validateJWT], controller.createPost);
    router.post('/:postID/likes', [authMiddleware.validateJWT], controller.toggleLike);
    router.post('/:postID/comments', [authMiddleware.validateJWT], controller.addComent);
    router.get('/', controller.getPosts);

    return router;
  };
};