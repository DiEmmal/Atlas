import type { CreatePostDto } from "../../dtos/index.js";
import { PostEntity } from "../../entities/post.entity.js";
import type { UserEntity } from "../../entities/user.entity.js";
import type { PostRepository } from "../../repositories/post.repository.js";
import type { ImageFile, ImageService } from "../../services/image.service.js";

export class CreatePostUseCase {

    public constructor(
        private readonly postRepository: PostRepository,
        private readonly imageService: ImageService,
    ) { };

    public async execute(dto: CreatePostDto, user: UserEntity, image?: ImageFile): Promise<PostEntity> {
        let imgName: string | undefined;
        if (image) imgName = await this.imageService.uploadImage(image, undefined, 'posts');

        return this.postRepository.createPost(dto, user, imgName);
    };

};