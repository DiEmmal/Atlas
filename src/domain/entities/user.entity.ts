import { getUUID } from "../../config/index.js";
import { CustomHttpError } from "../errors/custom-http.error.js";

export class UserEntity {
    public id: string;
    public name: string;
    public email: string;
    public password: string;
    public emailValidated: boolean;
    public img: string;

    constructor(name: string, email: string, password: string, img?: string) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.id = getUUID();
        this.emailValidated = false;
        this.img = img ?? '';
    };

    public static fromObject(user: { [key: string]: any }): UserEntity {

        const { name, email, password, id, emailValidated, img } = user;

        if(
            !name ||
            !email ||
            !password ||
            !id ||
            emailValidated === undefined ||
            img === undefined
        ) throw CustomHttpError.internalServerError('User data is invalid');

        const newUserEntity = new UserEntity(
            name,
            email,
            password,
            img
        );
        
        newUserEntity.id = id;
        newUserEntity.emailValidated = emailValidated;

        return newUserEntity;

    };

};