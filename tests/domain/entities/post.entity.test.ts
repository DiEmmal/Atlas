import { PostEntity } from "../../../src/domain/index.js";

describe("post.entity.ts", () => {
    it("should create a post entity with valid properties", () => {
        const title = "My First Post";
        const content = "This is the content of my first post.";
        const author = { id: "123e4567-e89b-12d3-a456-426614174000", name: "John Doe" };

        const newPost = new PostEntity({ author, title, content });

        expect(newPost).toBeInstanceOf(PostEntity);
        expect(newPost.title).toBe(title);
        expect(newPost.content).toBe(content);
        expect(newPost.author).toStrictEqual(author);
        expect(newPost.id).toEqual(expect.any(String));
        expect(newPost.likes).toEqual({ likedBy: [], count: 0 });
        expect(newPost.comments).toEqual([]);
        expect(newPost.img).toBe('');
    });

    it("should create a post entity from an object", () => {
        const postObject = {
            title: "My Second Post",
            content: "This is the content of my second post.",
            author: { id: "123e4567-e89b-12d3-a456-426614174000", name: "John Doe" },
            id: "123e4567-e89b-12d3-a456-426614174001"
        };

        const newPost = PostEntity.fromObject(postObject);

        expect(newPost).toBeInstanceOf(PostEntity);
        expect(newPost.title).toBe(postObject.title);
        expect(newPost.content).toBe(postObject.content);
        expect(newPost.author).toStrictEqual(postObject.author);
        expect(newPost.id).toBe(postObject.id);
    });

    it("should throw an error when creating a post entity from an invalid object", () => {
        const invalidPostObject = {
            title: "My Third Post",
            content: "This is the content of my third post."
            // Missing author and id
        };

        expect(() => PostEntity.fromObject(invalidPostObject)).toThrow();

    });
});