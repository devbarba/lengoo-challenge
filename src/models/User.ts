import { Model, model, Schema } from 'mongoose';

import { IUser } from '../interfaces/user';

const User = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const UserModel: Model<IUser> = model<IUser, Model<IUser>>('User', User);

export default UserModel;
