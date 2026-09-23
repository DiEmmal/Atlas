import { AuthServiceImpl, EmailServiceImpl, ImageServiceImpl, PostDatasourceImpl, PostRepositoryImpl, UserDatasourceImpl, UserRepositoryImpl } from "../infrastructure/index.js";
import { AuthMiddleware } from "./middlewares/auth.middleware.js";
import { ErrorService } from "./services/error.service.js";

export class AppDependencies {

    public readonly userDatasource = new UserDatasourceImpl();
    public readonly userRepository = new UserRepositoryImpl(this.userDatasource);

    public readonly emailService = new EmailServiceImpl();
    public readonly authService = new AuthServiceImpl(this.emailService);

    public readonly postDatasource = new PostDatasourceImpl();
    public readonly postRepository = new PostRepositoryImpl(this.postDatasource);
    public readonly imageService = new ImageServiceImpl();
    public readonly errorService = new ErrorService();

    public readonly authMiddleware = new AuthMiddleware(
        this.userRepository,
        this.authService,
        this.errorService,
    );

};

export const dependencies = new AppDependencies();
