import { PostCommentEntity } from "../../../src/domain/entities/post-comment.entity.js";

describe("post-comment.entity.ts", () => {
    it("should create a post comment entity with the provided properties", () => {
        const author = { id: "user-id", name: "John Doe" };
        const comment = new PostCommentEntity({
            author,
            postID: "post-id",
            content: "This is a useful comment.",
        });

        expect(comment).toBeInstanceOf(PostCommentEntity);
        expect(comment.id).toEqual(expect.any(String));
        expect(comment.author).toEqual(author);
        expect(comment.postID).toBe("post-id");
        expect(comment.content).toBe("This is a useful comment.");
    });

    it("should create a post comment entity from an object", () => {
        const comment = PostCommentEntity.fromObject({
            author: { id: "user-id", name: "John Doe" },
            postID: "post-id",
            content: "This is a useful comment.",
        });

        expect(comment).toBeInstanceOf(PostCommentEntity);
        expect(comment.postID).toBe("post-id");
        expect(comment.content).toBe("This is a useful comment.");
    });
});