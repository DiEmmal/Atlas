import { LoginUserDto } from "../../../../src/domain/dtos/auth/login-user.dto.js";

describe("login-user.dto.ts", () => {
    it("should create a login DTO with a normalized email", () => {
        const result = LoginUserDto.create({ email: "USER@EXAMPLE.COM", password: "secret123" });

        expect(result.error).toBeUndefined();
        expect(result.dto).toEqual(expect.objectContaining({
            email: "user@example.com",
            password: "secret123",
        }));
    });

    it("should reject a login DTO with an invalid email", () => {
        const result = LoginUserDto.create({ email: "invalid-email", password: "secret123" });

        expect(result.dto).toBeUndefined();
        expect(result.error).toBe("User email is invalid");
    });
});