import { AuthService, UserEntity, UserRepository } from "../../domain/index.js";
import type { ErrorService } from "../services/error.service.js";
import type { NextFunction, Request, Response } from "express";

export class AuthMiddleware {

    public constructor(
        private readonly repository: UserRepository,
        private readonly service: AuthService,
        private readonly errorService: ErrorService,
    ) { };

    public validateJWT = async (req: Request, res: Response, next: NextFunction) => {

        const authorization = req.headers['authorization'];
        if (!authorization) return res.status(401).json({ error: 'No token provided' });
        if (!authorization.startsWith('Bearer ')) return res.status(401).json({ error: 'Invalid token' });

        const token = authorization.split(' ')[1];

        if (!token) return res.status(401).json({ error: 'No token provided' });

        try {

            const payload = await this.service.validateJWT(token) as { email: string };
            if (!payload) return res.status(401).json({ error: 'Invalid token' });

            const foundUser = await this.repository.findByEmail(payload.email);
            if (!foundUser) return res.status(401).json({ error: 'Invalid token' });

            const user = UserEntity.fromObject(foundUser)
            user.password = '';

            req.body.user = user;

            next();

        } catch (error) {
            return this.errorService.HandleHttpError(error, res);
        };

    };

};