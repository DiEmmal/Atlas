export class LoginUserDto {

    private constructor(
        public readonly email: string,
        public readonly password: string
    ) { };

    static create(obj: { [key: string]: any }): { error?: string, dto?: LoginUserDto } {

        if (!obj) return { error: 'Invalid data' };

        const { email, password } = obj;

        if (typeof email !== 'string') return { error: 'User email must be a string' };
        if (email.trim() === '') return { error: 'User email is required' };
        if (/\s/.test(email)) return { error: 'User email must not contain spaces' };

        if (typeof password !== 'string') return { error: 'User password must be a string' };
        if (password.trim() === '') return { error: 'User password is required' };
        if (/\s/.test(password)) return { error: 'User password must not contain spaces' };

        const normalizedEmail = email.trim().toLowerCase();

        return { dto: new LoginUserDto(normalizedEmail, password) };

    };

};