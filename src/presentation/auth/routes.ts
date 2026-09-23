import { Router } from 'express';
import { AuthController } from './controller.js';
import type { UserRepository } from '../../domain/index.js';
import type { AuthService } from '../../domain/index.js';
import type { ErrorService } from '../services/error.service.js';

export class AuthRoutes {

  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
    private readonly errorService: ErrorService,
  ) { };

  public routes(): Router {
    const router = Router();

    const controller = new AuthController(this.userRepository, this.authService, this.errorService);

    router.post('/login', controller.login);
    router.post('/register', controller.register);
    router.get('/validate-email/:token', controller.validateEmail);

    return router;
  };
};