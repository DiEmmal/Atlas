import { ToggleLikeDto } from "../../../../src/domain/dtos/posts/toggle-like.dto.js";

describe("toggle-like.dto.ts", () => {
    it("should create a like DTO with a boolean value", () => {
        const result = ToggleLikeDto.create({ postID: "  post-id  ", liked: true });

        expect(result.error).toBeUndefined();
        expect(result.dto).toEqual(expect.objectContaining({ postID: "post-id", liked: true }));
    });

    it("should reject a like DTO with a non-boolean value", () => {
        const result = ToggleLikeDto.create({ postID: "post-id", liked: "true" });

        expect(result.dto).toBeUndefined();
        expect(result.error).toBe("liked must be a boolean");
    });
});