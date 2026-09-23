export class CreateCommentDto {

    private constructor(
        public readonly postID: string,
        public readonly comment: string,
    ) { };

    static create(obj: { [key: string]: unknown }): { error?: string, dto?: CreateCommentDto } {

        if (!obj || typeof obj !== 'object') return { error: 'Comment data must be an object' };

        const { postID, content } = obj;

        if (typeof postID !== 'string') return { error: 'postID must be a string' };
        const normalizedPostID = postID.trim();
        if (normalizedPostID === '') return { error: 'postID cannot be empty' };

        if (typeof content !== 'string') return { error: 'Comment content must be a string' };
        const normalizedComment = content.trim();
        if (normalizedComment === '') return { error: 'Comment content cannot be empty' };
        if (normalizedComment.length > 1000) return { error: 'Comment content cannot exceed 1000 characters' };

        return { dto: new CreateCommentDto(normalizedPostID, normalizedComment) };

    };

};
