export class ToggleLikeDto {

    private constructor(
        public readonly postID: string,
        public readonly liked: boolean,
    ) { };

    static create(obj: { [key: string]: unknown }): { error?: string, dto?: ToggleLikeDto } {

        if (!obj || typeof obj !== 'object') return { error: 'Like data must be an object' };

        const { postID, liked } = obj;

        if (typeof postID !== 'string') return { error: 'postID must be a string' };
        const normalizedPostID = postID.trim();
        if (normalizedPostID === '') return { error: 'postID cannot be empty' };

        if (typeof liked !== 'boolean') return { error: 'liked must be a boolean' };

        return { dto: new ToggleLikeDto(normalizedPostID, liked) };

    };

};
