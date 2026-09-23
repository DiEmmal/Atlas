import { AuthService, CreateUserDto, LoginUserDto, RegisterUserUseCase, UserRepository, LoginUserUseCase, ValidateEmailUseCase } from '../../domain/index.js';
import type { ErrorService } from '../services/error.service.js';
import type { Request, Response } from 'express';

export class AuthController {

  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
    private readonly errorService: ErrorService,
  ) {
    this.userRepository = userRepository;
  };

  register = async (req: Request, res: Response) => {
    const { error, dto } = CreateUserDto.create(req.body);

    if (error) return res.status(400).json({ error });

    const registerUserUseCase = new RegisterUserUseCase(
      this.userRepository,
      this.authService
    );

    registerUserUseCase.execute(dto!)
      .then(user => res.status(200).json({ message: `User registered successful, welcome ${user.name}!`, user }))
      .catch(error => this.errorService.HandleHttpError(error, res));

  };

  login = async (req: Request, res: Response) => {
    const { error, dto } = LoginUserDto.create(req.body);

    if (error) return res.status(400).json({ error });

    const loginUserUseCase = new LoginUserUseCase(
      this.userRepository,
      this.authService
    );

    loginUserUseCase.execute(dto!)
      .then(({ user, token }) => res.status(200).json({ message: `User logged in successful, welcome again ${user.name}!`, token }))
      .catch(error => this.errorService.HandleHttpError(error, res));

  };

  validateEmail = async (req: Request, res: Response) => {
    let { token } = req.params;
    token = Array.isArray(token) ? token[0] : token;

    if (!token) return res.status(400).json({ error: 'Token is required' });

    const validateEmailUseCase = new ValidateEmailUseCase(
      this.userRepository,
      this.authService
    );

    validateEmailUseCase.execute(token)
      .then(validated => res.status(200).json({ message: 'Email validated successfully', validated }))
      .catch(error => this.errorService.HandleHttpError(error, res));

  };

};