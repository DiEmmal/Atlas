import type { Request, Response } from "express";
import { CustomHttpError, GetUserImageUseCase, ImageService, PaginationDto, UpdateUserDto, UpdateUserUseCase, UserRepository } from "../../domain/index.js";
import { envs } from "../../config/envs.js";

export class UserController {

    constructor(
        private readonly repository: UserRepository,
        private readonly imageService: ImageService,
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

    public getUserImage = (req: Request, res: Response) => {
        const fileName = Array.isArray(req.params.fileName) ? req.params.fileName[0] : req.params.fileName;
        if (!fileName) return res.status(400).json({ error: 'Not file provided' });

        const getUserImageUseCase = new GetUserImageUseCase(this.imageService);

        return getUserImageUseCase.execute(fileName)
            .then(imagePath => res.status(200).sendFile(imagePath))
            .catch(error => this.handleError(error, res));
    };

    public updateUser = async (req: Request, res: Response) => {
        const userID = Array.isArray(req.params.userID) ? req.params.userID[0] : req.params.userID;
        const uploadedFile = req.files?.image;
        const image = uploadedFile && !Array.isArray(uploadedFile) ? {
            data: uploadedFile.data,
            name: uploadedFile.name,
            mimetype: uploadedFile.mimetype,
            size: uploadedFile.size,
        } : undefined;

        const { error, dto } = UpdateUserDto.create(req.body, image !== undefined);

        if (error) return res.status(400).json({ error });

        const updateUserUseCase = new UpdateUserUseCase(this.repository, this.imageService);

        return updateUserUseCase.execute(dto!, userID!, image)
            .then(user => res.status(200).json({
                message: 'User updated successfully',
                user: { ...user, imgURL: user.img ? `${envs.WEBSERVICE_URL}/users/image/${user.img}` : undefined },
            }))
            .catch(error => this.handleError(error, res));

    };

};