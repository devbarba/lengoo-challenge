import { IUser } from '@interfaces/user';
import { Document } from 'mongodb';
import { Model, model, Schema } from 'mongoose';

interface IUserModel extends IUser, Document {}

const User = new Schema(
    {
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
    },
    { timestamps: true }
);

const UserModel: Model<IUserModel> = model<IUserModel, Model<IUserModel>>(
    'User',
    User
);

export default UserModel;
