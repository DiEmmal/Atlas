export class LoginUserDto {

    private constructor(
        public readonly email: string,
        public readonly password: string
    ) { };

    static create(obj: { [key: string]: unknown }): { error?: string, dto?: LoginUserDto } {

        if (!obj || typeof obj !== 'object') return { error: 'Login data must be an object' };

        const { email, password } = obj;

        if (typeof email !== 'string') return { error: 'User email must be a string' };
        if (email.trim() === '') return { error: 'User email is required' };
        if (/\s/.test(email)) return { error: 'User email must not contain spaces' };

        const normalizedEmail = email.trim().toLowerCase();
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (normalizedEmail.length > 254) return { error: 'User email must not exceed 254 characters' };
        if (!emailRegex.test(normalizedEmail)) return { error: 'User email is invalid' };

        if (typeof password !== 'string') return { error: 'User password must be a string' };
        if (password.trim() === '') return { error: 'User password is required' };
        if (/\s/.test(password)) return { error: 'User password must not contain spaces' };
        if (password.length < 6) return { error: 'User password must be at least 6 characters long' };
        if (password.length > 100) return { error: 'User password must not exceed 100 characters' };

        return { dto: new LoginUserDto(normalizedEmail, password) };

    };

};