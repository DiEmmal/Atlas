import path from "node:path";
import { getUUID } from "../../config/uuid.adapter.js";
import { CustomHttpError, ImageService, type ImageFile } from "../../domain/index.js";
import fs from "node:fs/promises";

export class ImageServiceImpl extends ImageService {

    private static readonly allowedMimeTypes = new Set(['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']);
    private static readonly validExtensions = new Set(['jpg', 'jpeg', 'png', 'gif', 'webp']);

    private sanitizeName(value: string, field: string): string {
        const normalizedName = value.normalize('NFKC');

        if (!normalizedName || normalizedName.includes('..') || normalizedName.includes('/') || normalizedName.includes('\\')) {
            throw CustomHttpError.badRequest(`Invalid ${field}`);
        }

        const baseName = path.basename(normalizedName);
        if (baseName !== normalizedName || !baseName) {
            throw CustomHttpError.badRequest(`Invalid ${field}`);
        }

        return baseName;
    }

    private sanitizeFolder(folder: string): string {
        const normalizedFolder = folder.normalize('NFKC');

        if (!normalizedFolder || normalizedFolder.includes('..') || normalizedFolder.includes('/') || normalizedFolder.includes('\\')) {
            throw CustomHttpError.badRequest('Invalid folder');
        }

        return normalizedFolder;
    }

    public async uploadImage(file: ImageFile, folder: string): Promise<string> {

        try {
            const safeFileName = this.sanitizeName(file.name, 'file name');
            const fileExtension = safeFileName.split('.').pop()?.toLowerCase();

            if (!fileExtension || !ImageServiceImpl.validExtensions.has(fileExtension)) {
                throw CustomHttpError.badRequest('Invalid file extension');
            }

            if (!ImageServiceImpl.allowedMimeTypes.has(file.mimetype)) {
                throw CustomHttpError.badRequest('Invalid image mimetype');
            }

            if (file.size > 5 * 1024 * 1024) {
                throw CustomHttpError.badRequest('File size exceeds the limit of 5MB');
            }

            const safeFolder = this.sanitizeFolder(folder);
            const basePath = path.resolve(process.cwd(), 'uploads');
            const imagePath = path.resolve(basePath, safeFolder);
            const relativePath = path.relative(basePath, imagePath);

            if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
                throw CustomHttpError.badRequest('Invalid folder');
            }

            await fs.mkdir(imagePath, { recursive: true });

            const fileName = `${getUUID()}.${fileExtension}`;
            const targetPath = path.join(imagePath, fileName);

            if (targetPath.startsWith(imagePath) === false) {
                throw CustomHttpError.badRequest('Invalid target path');
            }

            await fs.writeFile(targetPath, file.data);

            return fileName;

        } catch (error) {
            throw error;
        }

    }

    public async getImage(fileName: string, folder: string): Promise<string> {

        try {
            const safeFileName = this.sanitizeName(fileName, 'file name');
            const safeFolder = this.sanitizeFolder(folder);
            const basePath = path.resolve(process.cwd(), 'uploads');
            const imagePath = path.resolve(basePath, safeFolder);
            const filePath = path.resolve(imagePath, safeFileName);
            const relativePath = path.relative(imagePath, filePath);

            if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
                throw CustomHttpError.badRequest('Invalid image path');
            }

            await fs.access(filePath);
            return filePath;
        } catch (error) {
            if (error instanceof CustomHttpError) {
                throw error;
            }
            throw CustomHttpError.notFound(`Image not found: ${fileName}`);
        }

    }

};