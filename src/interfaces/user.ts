import { Document, ObjectId } from 'mongoose';

interface IUser extends Document {
    _id?: ObjectId;
    name: string;
    email: string;
    role: string;
    active: boolean;
    password: string;
}

export { IUser };
