export interface ImageFile {
    data: Buffer;
    name: string;
    mimetype: string;
    size: number;
};

export abstract class ImageService {
    abstract uploadImage(file: ImageFile, userID: string | undefined, folder: string): Promise<string>;
    abstract getImage(fileName: string, folder: string): Promise<string>;
};