import type { UpdateUserDto } from "../../dtos/index.js";
import { UserEntity } from "../../entities/user.entity.js";
import type { UserRepository } from "../../repositories/user.repository.js";
import type { ImageFile, ImageService } from "../../services/image.service.js";

export class UpdateUserUseCase {

    constructor(
        private readonly userRepository: UserRepository,
        private readonly imageService: ImageService,
    ) { };

    async execute(dto: UpdateUserDto, userID: string, image?: ImageFile): Promise<UserEntity> {
        let imageName: string | undefined;
        if (image) imageName = await this.imageService.uploadImage(image, userID, 'users');

        const updateDto = imageName ? dto.withImage(imageName) : dto;
        return this.userRepository.updateUser(updateDto, userID);
    };

};