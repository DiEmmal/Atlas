export class UpdateUserDto {
    private constructor(
        public readonly name?: string,
        public readonly password?: string,
    ) { };

    public static create(props: { [key: string]: any }): { error?: string, dto?: UpdateUserDto } {

        if (!props) return { error: 'Data is empty' };

        const { name, password } = props;

        if (password !== undefined && password !== null && password !== '' && password.length < 6) {
            return { error: 'Password must be at least 6 characters long' };
        };

        if (password === '') return { error: 'Password must be at least 6 characters long' };

        if (name !== undefined && name === '') return { error: 'You can not leave name empty' };

        const hasDataToUpdate = name !== undefined || password !== undefined;
        if (!hasDataToUpdate) return { error: 'At least one field is required to update' };

        return { dto: new UpdateUserDto( name, password) };

    };
}