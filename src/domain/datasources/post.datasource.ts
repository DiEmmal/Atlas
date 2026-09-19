import type { CreateCommentDto, CreatePostDto, PaginationDto, ToggleLikeDto } from "../dtos/index.js";
import type { PostCommentEntity } from "../entities/post-comment.entity.js";
import type { PostEntity } from "../entities/post.entity.js";
import type { UserEntity } from "../entities/user.entity.js";

export abstract class PostDatasource {
    abstract createPost(dto: CreatePostDto, user: UserEntity, imgName: string | undefined): Promise<PostEntity>;
    abstract getPosts(dto: PaginationDto): Promise<{ posts: PostEntity[], total: number}>;
    abstract toggleLike(dto: ToggleLikeDto, user: UserEntity): Promise<{ liked: boolean, likes: number, postID: string }>;
    abstract createComment(dto: CreateCommentDto, user: UserEntity): Promise<PostCommentEntity>;
};