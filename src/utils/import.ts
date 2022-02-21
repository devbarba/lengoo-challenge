import { hash } from 'bcryptjs';
import { ObjectId } from 'mongodb';

import app from '../app';
import createConnection from '../database';
import { IUser } from '../interfaces/user';
import User from '../models/User';

const user: IUser = {
    _id: new ObjectId('LengooLengoo'),
    name: 'Lengoo',
    email: 'challenge@lengoo.com',
    role: 'Admin',
    active: true,
    password: '',
};

class ImportUser {
    constructor() {
        createConnection(app.configObject.app.database);
        this.importUser();
    }

    public async importUser(): Promise<void> {
        try {
            const userToAdd = await User.findOne({ _id: user._id });

            if (!userToAdd)
                await User.create({
                    ...user,
                    password: await hash('123456', 8),
                });

            process.exit();
        } catch (err) {
            process.exit(1);
        }
    }
}

export default new ImportUser();
