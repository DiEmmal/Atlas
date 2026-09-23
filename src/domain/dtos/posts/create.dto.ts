export class CreatePostDto {

    private constructor(
        public readonly title: string,
        public readonly content: string,
    ) { };

    static create(obj: { [key: string]: unknown }): { error?: string, dto?: CreatePostDto } {

        if (!obj || typeof obj !== 'object') return { error: 'Post data must be an object' };

        const { title, content, } = obj;

        if (typeof title !== 'string') return { error: 'Title must be a string' };
        const normalizedTitle = title.trim();
        if (normalizedTitle === '') return { error: 'Title cannot be empty' };
        if (normalizedTitle.length > 100) return { error: 'Title cannot exceed 100 characters' };

        if (typeof content !== 'string') return { error: 'Content must be a string' };
        const normalizedContent = content.trim();
        if (normalizedContent === '') return { error: 'Content cannot be empty' };
        if (normalizedContent.length > 1000) return { error: 'Content cannot exceed 1000 characters' };

        return { dto: new CreatePostDto(normalizedTitle, normalizedContent) };

    };

};