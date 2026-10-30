import type { UpdateUserDto } from "../../dtos/index.js";
import type { PublicUser } from "../../interfaces/public-user.js";
import type { UserRepository } from "../../repositories/user.repository.js";
import type { ImageFile, ImageService } from "../../services/image.service.js";

export class UpdateUserUseCase {

    constructor(
        private readonly userRepository: UserRepository,
        private readonly imageService: ImageService,
    ) { };

    async execute(dto: UpdateUserDto, userID: string, image?: ImageFile): Promise<PublicUser> {
        let imageName: string | undefined;
        if (image) imageName = await this.imageService.uploadImage(image, userID, 'users');

        const updateDto = imageName ? dto.withImage(imageName) : dto;

        const user = await this.userRepository.updateUser(updateDto, userID);
        return user.toPublicUser();
    };

};