interface IUser {
    _id?: string;
    name: string;
    email: string;
    role: string;
    active: boolean;
    password: string;
    created_at?: Date;
    updated_at?: Date;
}

export { IUser };
