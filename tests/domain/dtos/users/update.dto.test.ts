import { UpdateUserDto } from "../../../../src/domain/dtos/users/update.dto.js";

describe("update.dto.ts", () => {
    it("should create an update DTO with a normalized name", () => {
        const result = UpdateUserDto.create({ name: "  Updated Name  " });

        expect(result.error).toBeUndefined();
        expect(result.dto).toEqual(expect.objectContaining({ name: "Updated Name" }));
    });

    it("should add an image to an update DTO", () => {
        const result = UpdateUserDto.create({ name: "Updated Name" });
        const dtoWithImage = result.dto?.withImage("profile.png");

        expect(dtoWithImage).toEqual(expect.objectContaining({
            name: "Updated Name",
            img: "profile.png",
        }));
    });

    it("should reject an update DTO without fields to update", () => {
        const result = UpdateUserDto.create({});

        expect(result.dto).toBeUndefined();
        expect(result.error).toBe("At least one field is required to update");
    });
});