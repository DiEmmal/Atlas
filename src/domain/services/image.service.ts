export interface ImageFile {
    data: Buffer;
    name: string;
    mimetype: string;
    size: number;
};

export abstract class ImageService {
    abstract uploadImage(file: ImageFile): Promise<string>;
    abstract getImage(fileName: string): Promise<string>;
};