import { ObjectId } from 'mongodb';

interface IUser {
    _id?: ObjectId | string;
    name: string;
    email: string;
    role: string;
    active: boolean;
    password: string;
    created_at?: Date;
    updated_at?: Date;
}

export { IUser };
