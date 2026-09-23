export class CreateUserDto {

    private constructor(
        public readonly name: string,
        public readonly email: string,
        public readonly password: string
    ) { };

    static create(obj: { [key: string]: unknown }): { error?: string, dto?: CreateUserDto } {

        if (!obj || typeof obj !== 'object') return { error: 'Registration data must be an object' };

        const { name, email, password } = obj;

        if (typeof name !== 'string') return { error: 'User name must be a string' };
        const trimmedName = name.trim();
        if (trimmedName === '') return { error: 'User name is required' };
        if (trimmedName.length < 3) return { error: 'User name must be at least 3 characters long' };
        if (trimmedName.length > 25) return { error: 'User name must not exceed 25 characters' };

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (typeof email !== 'string') return { error: 'User email must be a string' };
        if (email.trim() === '') return { error: 'User email is required' };
        if (/\s/.test(email)) return { error: 'User email must not contain spaces' };
        if (email.trim().length > 254) return { error: 'User email must not exceed 254 characters' };

        const normalizedEmail = email.trim().toLowerCase();
        if (!emailRegex.test(normalizedEmail)) return { error: 'User email is invalid' };

        if (typeof password !== 'string') return { error: 'User password must be a string' };
        if (password.trim() === '') return { error: 'User password is required' };
        if (/\s/.test(password)) return { error: 'User password must not contain spaces' };
        if (password.length < 6) return { error: 'User password must be at least 6 characters long' };
        if (password.length > 100) return { error: 'User password must not exceed 100 characters' };

        return { dto: new CreateUserDto(trimmedName, normalizedEmail, password) };

    };

};