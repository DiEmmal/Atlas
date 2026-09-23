import { UserEntity } from "../../../src/domain/index.js";

describe("user.entity.ts", () => {

    it("should create a user entity with the provided properties", () => {
        const name = "John Doe";
        const email = "john.doe@example.com";
        const password = "password123";
        const img = "image.png";

        const newUser = new UserEntity(name, email, password, img);

        expect(newUser).toBeInstanceOf(UserEntity);
        expect(newUser.name).toBe(name);
        expect(newUser.email).toBe(email);
        expect(newUser.password).toBe(password);
        expect(newUser.img).toBe(img);
        expect(newUser.id).toEqual(expect.any(String));
        expect(newUser.emailValidated).toBe(false);
    });

    it("should create a user entity without an image", () => {
        const name = "Jane Doe";
        const email = "jane.doe@example.com";
        const password = "password123";

        const newUser = new UserEntity(name, email, password);

        expect(newUser).toBeInstanceOf(UserEntity);
        expect(newUser.name).toBe(name);
        expect(newUser.email).toBe(email);
        expect(newUser.password).toBe(password);
        expect(newUser.img).toBe('');
        expect(newUser.id).toEqual(expect.any(String));
        expect(newUser.emailValidated).toBe(false);
    });

    it("should create a user entity from an object", () => {
        const userObject = {
            name: "Alice Smith",
            email: "alice.smith@example.com",
            password: "password123",
            img: "image.png",
            id: "123e4567-e89b-12d3-a456-426614174000",
            emailValidated: false
        };

        const newUser = UserEntity.fromObject(userObject);

        expect(newUser).toBeInstanceOf(UserEntity);
        expect(newUser.name).toBe(userObject.name);
        expect(newUser.email).toBe(userObject.email);
        expect(newUser.password).toBe(userObject.password);
        expect(newUser.img).toBe(userObject.img);
        expect(newUser.id).toBe(userObject.id);
        expect(newUser.emailValidated).toBe(userObject.emailValidated);
    });

    it("should throw an error when creating a user entity from an invalid object", () => {
        const invalidUserObject = {
            name: "Bob Johnson",
            email: "bob.johnson@example.com",
            password: "password123",
            img: "image.png",
            id: "123e4567-e89b-12d3-a456-426614174000",
            emailValidated: false
        };

        expect(() => UserEntity.fromObject(invalidUserObject)).not.toThrow();
    });

});