import type { Request, Response } from "express";
import { CustomHttpError, PaginationDto, UpdateUserDto, UpdateUserUseCase, UserRepository } from "../../domain/index.js";

export class UserController {

    constructor(
        private readonly repository: UserRepository,
    ) { };

    private handleError(error: unknown, res: Response) {

        if (error instanceof CustomHttpError) return res.status(error.httpCode).json({ error: error.message });

        return res.status(500).json({ error: 'Internal server error' });

    };

    public getUsers = async (req: Request, res: Response) => {
        const { page, limit } = req.query;
        const { error, dto } = page && limit ? PaginationDto.create({ page: Number(page), limit: Number(limit) }) : PaginationDto.create();

        if (error) return res.status(400).json({ error });

        return this.repository.getUsers(dto!)
            .then(users => res.status(200).json(users))
            .catch(error => this.handleError(error, res));

    };

    public getUserById = async (req: Request, res: Response) => {
        const userID = Array.isArray(req.params.userID) ? req.params.userID[0] : req.params.userID;

        if (!userID) return res.status(400).json({ error: 'User id is required' });

        return this.repository.getUserById(userID)
            .then(user => res.status(200).json(user))
            .catch(error => this.handleError(error, res));

    };

    public updateUser = async (req: Request, res: Response) => {
        const userID = Array.isArray(req.params.userID) ? req.params.userID[0] : req.params.userID;
        const { error, dto } = UpdateUserDto.create(req.body);

        if (error) return res.status(400).json({ error });

        const updateUserUseCase = new UpdateUserUseCase(this.repository);

        return updateUserUseCase.execute(dto!, userID!)
            .then(user => res.status(200).json({ message: 'User updated successfully', user }))
            .catch(error => this.handleError(error, res));

    };

};