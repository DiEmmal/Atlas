import { CreateCommentDto } from "../../../../src/domain/dtos/posts/create-comment.dto.js";

describe("create-comment.dto.ts", () => {
    it("should create a comment DTO with trimmed values", () => {
        const result = CreateCommentDto.create({ postID: "  post-id  ", content: "  Nice post  " });

        expect(result.error).toBeUndefined();
        expect(result.dto).toEqual(expect.objectContaining({
            postID: "post-id",
            comment: "Nice post",
        }));
    });

    it("should reject a comment DTO without a post ID", () => {
        const result = CreateCommentDto.create({ postID: "", content: "Nice post" });

        expect(result.dto).toBeUndefined();
        expect(result.error).toBe("postID cannot be empty");
    });
});