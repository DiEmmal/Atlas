import type { ImageService, PostRepository } from "../../index.js";


export class GetPostImageUseCase {

    public constructor(
        private readonly imageService: ImageService,
    ) { };

    public async execute(imgName: string): Promise<string> {
        return this.imageService.getImage(imgName);
    };

};