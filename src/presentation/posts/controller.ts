import { envs } from "../../config/envs.js";
import { GetPostImageUseCase, CreatePostDto, CustomHttpError, ImageService, PostRepository, GetPostsUseCase, CreatePostUseCase, PaginationDto, ToggleLikeDto, ToggleLikeUseCase, CreateCommentDto, CreateCommentUseCase } from "../../domain/index.js";
import type { Request, Response } from "express";

export class PostsController {

    constructor(
        private readonly postRepository: PostRepository,
        private readonly imageService: ImageService,
    ) { };

    private handleError(error: unknown, res: Response) {

        if (error instanceof CustomHttpError) return res.status(error.httpCode).json({ error: error.message });

        return res.status(500).json({ error: 'Internal server error' });

    };

    public getPosts = async (req: Request, res: Response) => {
        const { page, limit } = req.query;
        const { error, dto } = page && limit ? PaginationDto.create({ page: Number(page), limit: Number(limit) }) : PaginationDto.create();

        if (error) return res.status(400).json({ error });

        const getPostsUseCase = new GetPostsUseCase(this.postRepository);

        return getPostsUseCase.execute(dto!)
            .then(posts => res.status(200).json(posts))
            .catch(error => this.handleError(error, res));

    };

    createPost = (req: Request, res: Response) => {
        const user = req.body.user;
        const uploadedFile = req.files?.image;

        const image = uploadedFile && !Array.isArray(uploadedFile) ? {
            data: uploadedFile.data,
            name: uploadedFile.name,
            mimetype: uploadedFile.mimetype,
            size: uploadedFile.size,
        } : undefined;

        const { error, dto } = CreatePostDto.create(req.body);
        if (error) return res.status(400).json({ error });

        const createPostUseCase = new CreatePostUseCase(this.postRepository, this.imageService);

        return createPostUseCase.execute(dto!, user, image)
            .then(post => res.status(201).json({ message: 'Post created successfully', post: {...post, imgURL: `${envs.WEBSERVICE_URL}/posts/image/${post.img}` } }))
            .catch(error => this.handleError(error, res));
    };

    getPostImage = (req: Request, res: Response) => {
        const fileName = Array.isArray(req.params.fileName) ? req.params.fileName[0] : req.params.fileName;
        if(!fileName) return res.status(400).json({ error: 'Not file provided' });

        const getPostImageUseCase = new GetPostImageUseCase(this.imageService);

        return getPostImageUseCase.execute(fileName)
            .then((imagePath) => res.status(200).sendFile(imagePath))
            .catch(error => this.handleError(error, res));
    };

    public toggleLike = async (req: Request, res: Response) => {
        const user = req.body.user;
        if (!user) return res.status(401).json({ error: 'User not authenticated' });

        const { error, dto } = ToggleLikeDto.create({ postID: req.params.postID, liked: req.body.liked });

        if (error) return res.status(400).json({ error });

        const toggleLikeUseCase = new ToggleLikeUseCase(this.postRepository);

        return toggleLikeUseCase.execute(dto!, user)
            .then(result => res.status(200).json({
                message: result.liked ? 'Like added successfully' : 'Like removed successfully',
                ...result,
            }))
            .catch(error => this.handleError(error, res));
    };

    public addComent = async (req: Request, res: Response) => {
        const user = req.body.user;
        if (!user) return res.status(401).json({ error: 'User not authenticated' });
        const { error, dto } = CreateCommentDto.create({ postID: req.params.postID, content: req.body.content });

        if (error) return res.status(400).json({ error });

        const createCommentUseCase = new CreateCommentUseCase(this.postRepository);

        createCommentUseCase.execute(dto!, user)
            .then(comment => res.status(200).json({ message: 'Comment created successful', comment }))
            .catch(error => this.handleError(error, res));

    };

};