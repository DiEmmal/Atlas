import { AuthServiceImpl, EmailServiceImpl, PostDatasourceImpl, PostRepositoryImpl, UserDatasourceImpl, UserRepositoryImpl } from "../infrastructure/index.js";
import { AuthMiddleware } from "./middlewares/auth.middleware.js";

export class AppDependencies {

    public readonly userDatasource = new UserDatasourceImpl();
    public readonly userRepository = new UserRepositoryImpl(this.userDatasource);

    public readonly emailService = new EmailServiceImpl();
    public readonly authService = new AuthServiceImpl(this.emailService);

    public readonly postDatasource = new PostDatasourceImpl();
    public readonly postRepository = new PostRepositoryImpl(this.postDatasource);

    public readonly authMiddleware = new AuthMiddleware(
        this.userRepository,
        this.authService,
    );

};

export const dependencies = new AppDependencies();
