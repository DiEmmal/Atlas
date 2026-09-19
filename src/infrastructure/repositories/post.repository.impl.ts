import { CreatePostDto, PostDatasource, PostEntity, UserEntity, PostRepository, PaginationDto, ToggleLikeDto, CreateCommentDto, PostCommentEntity } from "../../domain/index.js";

export class PostRepositoryImpl implements PostRepository {

    constructor(
        private readonly postDatasource: PostDatasource
    ) { };


    async createPost(dto: CreatePostDto, user: UserEntity, imgName: string | undefined): Promise<PostEntity> {
        return this.postDatasource.createPost(dto, user, imgName);
    };

    async getPosts(dto: PaginationDto): Promise<{ posts: PostEntity[], total: number }> {
        return this.postDatasource.getPosts(dto);
    };

    async toggleLike(dto: ToggleLikeDto, user: UserEntity): Promise<{ liked: boolean, likes: number, postID: string }> {
        return this.postDatasource.toggleLike(dto, user);
    };

    createComment(dto: CreateCommentDto, user: UserEntity): Promise<PostCommentEntity> {
        return this.postDatasource.createComment(dto, user)
    };

};