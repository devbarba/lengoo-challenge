import { ObjectId } from 'mongodb';

interface IUser {
    _id?: ObjectId;
    name: string;
    email: string;
    role: string;
    active: boolean;
    password: string;
}

export { IUser };
