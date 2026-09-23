import { Router } from "express";
import { PostsController } from "./controller.js";
import type { AuthMiddleware } from "../middlewares/auth.middleware.js";
import type { PostRepository } from '../../domain/index.js';
import type { ImageService } from '../../domain/index.js';
import type { ErrorService } from '../services/error.service.js';

export class PostsRoutes {

  constructor(
    private readonly postRepository: PostRepository,
    private readonly authMiddleware: AuthMiddleware,
    private readonly imageService: ImageService,
    private readonly errorService: ErrorService,
  ) { };

  public routes(): Router {

    const router = Router();

    const controller = new PostsController(this.postRepository, this.imageService, this.errorService);

    router.post('/', [this.authMiddleware.validateJWT], controller.createPost);
    router.post('/:postID/likes', [this.authMiddleware.validateJWT], controller.toggleLike);
    router.post('/:postID/comments', [this.authMiddleware.validateJWT], controller.addComent);
    router.get('/', controller.getPosts);
    router.get('/image/:fileName', controller.getPostImage);

    return router;
  };
};