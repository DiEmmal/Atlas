import path from "node:path";
import { getUUID } from "../../config/uuid.adapter.js";
import { CustomHttpError, ImageService, type ImageFile } from "../../domain/index.js";
import fs from "node:fs/promises";

export class ImageServiceImpl extends ImageService {

    public async uploadImage(file: ImageFile, folder: string): Promise<string> {

        try {
            const fileExtension = file.name.split('.').pop();

            const validExtensions = ['jpg', 'jpeg', 'png', 'gif'];
            if (!validExtensions.includes(fileExtension!)) {
                throw CustomHttpError.badRequest('Invalid file extension');
            };

            if (file.size > 5 * 1024 * 1024) {
                throw CustomHttpError.badRequest('File size exceeds the limit of 5MB');
            };

            const imagePath = path.resolve(process.cwd(), 'uploads', folder);
            await fs.mkdir(imagePath, { recursive: true });

            const fileName = `${getUUID()}.${fileExtension}`;

            await fs.writeFile(path.join(imagePath, fileName), file.data);


            return fileName;

        } catch (error) {
            throw error;
        };

    };

    public async getImage(fileName: string, folder: string): Promise<string> {

        const imagePath = path.resolve(process.cwd(), 'uploads', folder);
        const filePath = path.join(imagePath, fileName);

        try {
            await fs.access(filePath);
            return filePath;
        } catch (error) {
            throw CustomHttpError.notFound(`Image not found: ${fileName}`);
        }

    };

};