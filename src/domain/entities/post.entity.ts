import { getUUID } from "../../config/uuid.adapter.js";

export class PostEntity {
    public id: string;
    public title: string;
    public content: string;
    public created_at: Date;
    public author: { id: string, name: string };
    public likes: { likedBy: string[], count: number };
    public comments: string[];
    public img: string;

    constructor(props:
        {
            title: string,
            content: string,
            author: { id: string, name: string },
            likes?: { likedBy: string[], count: number }
            comments?: string[],
            img?: string
        }
    ) {
        this.id = getUUID();
        this.title = props.title;
        this.content = props.content;
        this.created_at = new Date();
        this.author = { id: props.author.id, name: props.author.name };
        this.likes = props.likes || { likedBy: [], count: 0 };
        this.comments = props.comments || [];
        this.img = props.img || '';
    };

    static fromObject(props: { [key: string]: any }): PostEntity {

        const { id, title, content, author, likes, comments, img } = props;

        const post = new PostEntity({
            title,
            content,
            author,
            likes,
            comments,
            img
        });

        post.id = id;

        return post;

    };

};