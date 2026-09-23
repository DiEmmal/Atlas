import { CustomHttpError } from "../../../src/domain/errors/custom-http.error.js";

describe("custom-http.error.ts", () => {
    it("should create an unauthorized error with status code 401", () => {
        const error = CustomHttpError.unauthorized("Authentication is required");

        expect(error).toBeInstanceOf(CustomHttpError);
        expect(error.message).toBe("Authentication is required");
        expect(error.httpCode).toBe(401);
    });

    it("should create a not found error with status code 404", () => {
        const error = CustomHttpError.notFound("Resource was not found");

        expect(error).toBeInstanceOf(CustomHttpError);
        expect(error.message).toBe("Resource was not found");
        expect(error.httpCode).toBe(404);
    });
});