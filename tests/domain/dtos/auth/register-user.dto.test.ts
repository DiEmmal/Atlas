import { CreateUserDto } from "../../../../src/domain/dtos/auth/register-user.dto.js";

describe("register-user.dto.ts", () => {
    it("should create a user DTO with normalized name and email", () => {
        const result = CreateUserDto.create({
            name: "  Jane Doe  ",
            email: "JANE@EXAMPLE.COM",
            password: "secret123",
        });

        expect(result.error).toBeUndefined();
        expect(result.dto).toEqual(expect.objectContaining({
            name: "Jane Doe",
            email: "jane@example.com",
            password: "secret123",
        }));
    });

    it("should reject a user DTO with a short password", () => {
        const result = CreateUserDto.create({
            name: "Jane Doe",
            email: "jane@example.com",
            password: "123",
        });

        expect(result.dto).toBeUndefined();
        expect(result.error).toBe("User password must be at least 6 characters long");
    });
});