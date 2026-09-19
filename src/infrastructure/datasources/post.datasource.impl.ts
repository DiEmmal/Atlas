import { CreateCommentDto, CreatePostDto, CustomHttpError, PaginationDto, PostCommentEntity, PostDatasource, PostEntity, ToggleLikeDto, UserEntity, } from "../../domain/index.js";
import { PostCommentModel } from "../data/mongo/models/post-comment.model.js";
import { PostModel } from "../data/mongo/models/post.model.js";

export class PostDatasourceImpl implements PostDatasource {

    async createPost(dto: CreatePostDto, user: UserEntity, imgName: string | undefined): Promise<PostEntity> {

        const newPost = new PostEntity({
            author: {
                id: user.id,
                name: user.name
            },
            content: dto.content,
            title: dto.title,
            img: imgName ?? '',
        });

        const savedPost = await PostModel.create(newPost);
        console.log(`post imaged: ${savedPost.img}`);

        return PostEntity.fromObject(savedPost);

    };

    async getPosts(dto: PaginationDto): Promise<{ posts: PostEntity[], total: number }> {
        const { page, limit } = dto;

        try {
            const [total, posts] = await Promise.all([
                PostModel.countDocuments(),
                PostModel.find()
                    .skip((page - 1) * limit)
                    .limit(limit)
            ]);

            if (!posts || posts.length === 0) return { posts: [], total };

            return {
                posts: posts.map(post => PostEntity.fromObject(post)),
                total
            };

        } catch (error) {
            throw CustomHttpError.internalServerError(`${error}`);
        };

    };

    async toggleLike(dto: ToggleLikeDto, user: UserEntity): Promise<{ liked: boolean, likes: number, postID: string }> {
        const { postID, liked } = dto;

        try {

            const post = await PostModel.findOne({ id: postID });
            if (!post) throw CustomHttpError.notFound('Post not found');

            const alreadyLiked = post.likes?.likedBy.includes(user.id) ?? false;

            if (liked && !alreadyLiked) {
                post.likes?.likedBy.push(user.id);
                post.likes!.count += 1;
            };

            if (!liked && alreadyLiked) {
                post.likes!.likedBy = post.likes!.likedBy.filter(id => id !== user.id);
                post.likes!.count = post.likes!.likedBy.length;
            };

            await post.save();

            return {
                liked: liked && !alreadyLiked ? true : !liked && alreadyLiked ? false : alreadyLiked,
                likes: post.likes!.count,
                postID: post.id
            };

        } catch (error) {
            throw CustomHttpError.internalServerError(`${error}`);
        };
        
    };

    public async createComment(dto: CreateCommentDto, user: UserEntity): Promise<PostCommentEntity> {
        
        const { comment, postID} = dto;

        try {

            const newComment = new PostCommentEntity({
                author: {
                    id: user.id,
                    name: user.name
                },
                content: comment,
                postID: postID,
            });

            const commentSaved = await PostCommentModel.create(newComment);

            const post = await PostModel.findOne({ id: postID });
            post?.comments.push(commentSaved.id);

            if(!post) throw CustomHttpError.badRequest(`Post with id ${postID} not found`);

            post.save();

            return newComment;
            
        } catch (error) {
            throw CustomHttpError.internalServerError(`Internal server error while creating comment: ${error}`)
        };

    };

};