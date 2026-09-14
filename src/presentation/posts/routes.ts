import { Router } from "express";
import { PostsController } from "./controller.js";
import type { AuthMiddleware } from "../middlewares/auth.middleware.js";
import type { PostRepository } from '../../domain/index.js';

export class PostsRoutes {

  constructor(
    private readonly postRepository: PostRepository,
    private readonly authMiddleware: AuthMiddleware,
  ) { };

  public routes(): Router {

    const router = Router();

    const controller = new PostsController(this.postRepository);

    router.post('/', [this.authMiddleware.validateJWT], controller.createPost);
    router.post('/:postID/likes', [this.authMiddleware.validateJWT], controller.toggleLike);
    router.post('/:postID/comments', [this.authMiddleware.validateJWT], controller.addComent);
    router.get('/', controller.getPosts);

    return router;
  };
};