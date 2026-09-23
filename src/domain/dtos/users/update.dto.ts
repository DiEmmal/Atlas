export class UpdateUserDto {
    private constructor(
        public readonly name?: string,
        public readonly password?: string,
        public readonly img?: string,
    ) { };

    public static create(props: { [key: string]: unknown }, hasImage = false): { error?: string, dto?: UpdateUserDto } {

        if (!props || typeof props !== 'object') return { error: 'User update data must be an object' };

        const { name, password } = props;

        let normalizedName: string | undefined;
        let normalizedPassword: string | undefined;

        if (name !== undefined) {
            if (typeof name !== 'string') return { error: 'User name must be a string' };
            normalizedName = name.trim();
            if (normalizedName === '') return { error: 'User name is required' };
            if (normalizedName.length < 3) return { error: 'User name must be at least 3 characters long' };
            if (normalizedName.length > 25) return { error: 'User name must not exceed 25 characters' };
        };

        if (password !== undefined) {
            if (typeof password !== 'string') return { error: 'User password must be a string' };
            if (password.trim() === '') return { error: 'User password is required' };
            if (/\s/.test(password)) return { error: 'User password must not contain spaces' };
            if (password.length < 6) return { error: 'Password must be at least 6 characters long' };
            if (password.length > 100) return { error: 'User password must not exceed 100 characters' };
            normalizedPassword = password;
        };

        const hasDataToUpdate = name !== undefined || password !== undefined || hasImage;
        if (!hasDataToUpdate) return { error: 'At least one field is required to update' };

        return { dto: new UpdateUserDto(normalizedName, normalizedPassword) };

    };

    public withImage(imageName: string): UpdateUserDto {
        return new UpdateUserDto(this.name, this.password, imageName);
    };
}