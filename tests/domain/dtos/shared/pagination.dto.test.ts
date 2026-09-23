import { PaginationDto } from "../../../../src/domain/dtos/shared/pagination.dto.js";

describe("pagination.dto.ts", () => {
    it("should create a pagination DTO with default values", () => {
        const result = PaginationDto.create();

        expect(result.error).toBeUndefined();
        expect(result.dto).toEqual(expect.objectContaining({ page: 1, limit: 10 }));
    });

    it("should reject a pagination DTO with a non-positive page", () => {
        const result = PaginationDto.create({ page: 0, limit: 10 });

        expect(result.dto).toBeUndefined();
        expect(result.error).toBe("Page and limit must be grater than 0");
    });
});