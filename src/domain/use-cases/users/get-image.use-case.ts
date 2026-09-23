import type { ImageService } from "../../services/image.service.js";

export class GetUserImageUseCase {

    public constructor(
        private readonly imageService: ImageService,
    ) { };

    public async execute(userID: string): Promise<string> {
        return this.imageService.getImage(userID, 'users');
    };

};