import { hash } from 'bcryptjs';
import { ObjectId } from 'mongodb';
import { getRepository, Repository } from 'typeorm';

import app from '../app';
import createConnection from '../database';
import { IUser } from '../interfaces/user';
import User from '../models/User';

const user: IUser = {
    _id: new ObjectId('LengooLengoo'),
    role: 'Admin',
    name: 'Lengoo',
    active: true,
    email: 'challenge@lengoo.com',
    password: '',
};

class ImportUser {
    constructor() {
        createConnection(app.configObject.app.database).then(() => {
            this.importUser();
        });
    }

    public async importUser(): Promise<void> {
        try {
            const userRepository: Repository<User> = getRepository(User);

            const userToAdd = await userRepository.findOne(String(user._id));

            if (!userToAdd) {
                user.password = await hash('123456', 8);
                const newUser: User = userRepository.create(user);
                await userRepository.save(newUser);
            }

            process.exit();
        } catch (err) {
            console.log(err);
            process.exit(1);
        }
    }
}

export default new ImportUser();
