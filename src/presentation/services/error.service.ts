import { CustomHttpError } from "../../domain/index.js";
import type { Response } from "express";

export class ErrorService {

    public HandleHttpError(error: unknown, res: Response): Response {
        if (error instanceof CustomHttpError) {
            return res.status(error.httpCode).json({ error: error.message });
        }

        console.error('Unhandled application error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    };

};