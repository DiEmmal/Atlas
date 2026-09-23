import { CreatePostDto } from "../../../../src/domain/dtos/posts/create.dto.js";

describe("create.dto.ts", () => {
    it("should create a post DTO with trimmed values", () => {
        const result = CreatePostDto.create({ title: "  A title  ", content: "  Post content  " });

        expect(result.error).toBeUndefined();
        expect(result.dto).toEqual(expect.objectContaining({
            title: "A title",
            content: "Post content",
        }));
    });

    it("should reject a post DTO with empty content", () => {
        const result = CreatePostDto.create({ title: "A title", content: "   " });

        expect(result.dto).toBeUndefined();
        expect(result.error).toBe("Content cannot be empty");
    });
});