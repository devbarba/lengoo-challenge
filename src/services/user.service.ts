import { NOT_FOUND } from 'http-status';
import { getRepository } from 'typeorm';

import Handler from '../errors/handler.error';
import User from '../models/User';

interface IUserService {
    list(): Promise<User[]>;
}

class UserService implements IUserService {
    public async list(): Promise<User[]> {
        const users: User[] = await getRepository(User).find();

        if (users.length === 0)
            throw new Handler('no query results found', NOT_FOUND);

        return users;
    }
}

export default UserService;
