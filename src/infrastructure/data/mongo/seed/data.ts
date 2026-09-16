export interface SeedUser {
    id: string;
    name: string;
    email: string;
    password: string;
    emailValidated: boolean;
}

export interface SeedPost {
    id: string;
    title: string;
    content: string;
    created_at: Date;
    author: {
        id: string;
        name: string;
    };
    likes: {
        likedBy: string[];
        count: number;
    };
    comments: string[];
}

export interface SeedComment {
    id: string;
    postID: string;
    author: {
        id: string;
        name: string;
    };
    content: string;
}

export interface SeedData {
    users: SeedUser[];
    posts: SeedPost[];
    comments: SeedComment[];
}

export const seedData: SeedData = {
    users: [
        {
            id: 'seed-user-ana',
            name: 'Ana Torres',
            email: 'ana.torres@example.com',
            password: 'Password123!',
            emailValidated: true,
        },
        {
            id: 'seed-user-bruno',
            name: 'Bruno Silva',
            email: 'bruno.silva@example.com',
            password: 'Password123!',
            emailValidated: true,
        },
        {
            id: 'seed-user-carla',
            name: 'Carla Méndez',
            email: 'carla.mendez@example.com',
            password: 'Password123!',
            emailValidated: true,
        },
        {
            id: 'seed-user-diego',
            name: 'Diego Ruiz',
            email: 'diego.ruiz@example.com',
            password: 'Password123!',
            emailValidated: true,
        },
    ],
    posts: [
        {
            id: 'seed-post-typescript',
            title: 'Organizing a TypeScript project',
            content: 'Separating the domain, infrastructure, and presentation layers makes the project easier to test and maintain.',
            created_at: new Date('2026-09-10T09:00:00.000Z'),
            author: { id: 'seed-user-ana', name: 'Ana Torres' },
            likes: { likedBy: ['seed-user-bruno', 'seed-user-carla'], count: 2 },
            comments: ['seed-comment-architecture', 'seed-comment-tests'],
        },
        {
            id: 'seed-post-mongodb',
            title: 'Small habits for working with MongoDB',
            content: 'The right indexes, consistent documents, and reproducible seeds save a lot of time during development.',
            created_at: new Date('2026-09-11T14:30:00.000Z'),
            author: { id: 'seed-user-bruno', name: 'Bruno Silva' },
            likes: { likedBy: ['seed-user-ana', 'seed-user-diego', 'seed-user-carla'], count: 3 },
            comments: ['seed-comment-indexes'],
        },
        {
            id: 'seed-post-api',
            title: 'Designing an API that is pleasant to consume',
            content: 'Consistent responses and clear errors are just as important as the endpoint that handles the main use case.',
            created_at: new Date('2026-09-12T18:15:00.000Z'),
            author: { id: 'seed-user-carla', name: 'Carla Méndez' },
            likes: { likedBy: ['seed-user-ana'], count: 1 },
            comments: ['seed-comment-errors', 'seed-comment-pagination'],
        },
        {
            id: 'seed-post-learning',
            title: 'Learning by building small projects',
            content: 'A small but complete project lets you practice real-world decisions: validation, persistence, authentication, and deployment.',
            created_at: new Date('2026-09-13T11:45:00.000Z'),
            author: { id: 'seed-user-diego', name: 'Diego Ruiz' },
            likes: { likedBy: ['seed-user-ana', 'seed-user-bruno'], count: 2 },
            comments: [],
        },
    ],
    comments: [
        {
            id: 'seed-comment-architecture',
            postID: 'seed-post-typescript',
            author: { id: 'seed-user-diego', name: 'Diego Ruiz' },
            content: 'It also makes it easier to identify which part of the system needs to change when a new requirement appears.',
        },
        {
            id: 'seed-comment-tests',
            postID: 'seed-post-typescript',
            author: { id: 'seed-user-bruno', name: 'Bruno Silva' },
            content: 'It also makes use cases much easier to test without starting the entire application.',
        },
        {
            id: 'seed-comment-indexes',
            postID: 'seed-post-mongodb',
            author: { id: 'seed-user-carla', name: 'Carla Méndez' },
            content: 'Absolutely. Reviewing real filters before creating indexes helps avoid optimizing blindly.',
        },
        {
            id: 'seed-comment-errors',
            postID: 'seed-post-api',
            author: { id: 'seed-user-ana', name: 'Ana Torres' },
            content: 'Errors with predictable codes and messages make the frontend much simpler.',
        },
        {
            id: 'seed-comment-pagination',
            postID: 'seed-post-api',
            author: { id: 'seed-user-diego', name: 'Diego Ruiz' },
            content: 'Pagination should also return the total so the interface can provide useful context.',
        },
    ],
};
