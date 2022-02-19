import { hash } from 'bcryptjs';
import { NOT_FOUND, CONFLICT } from 'http-status';
import { getRepository } from 'typeorm';

import Handler from '../errors/handler.error';
import { IUser } from '../interfaces/user';
import User from '../models/User';

interface IUserService {
    list(): Promise<User[]>;
    create({ name, email, role, active, password }: IUser): Promise<User>;
    destroy(id: string): Promise<void>;
}

class UserService implements IUserService {
    public async list(): Promise<User[]> {
        const users: User[] = await getRepository(User).find();

        if (users.length === 0)
            throw new Handler('no query results found', NOT_FOUND);

        return users;
    }

    public async create({
        name,
        email,
        role,
        active,
        password,
    }: IUser): Promise<User> {
        const userRepository = getRepository(User);

        const user = await userRepository.findOne({ where: email });

        if (user) throw new Handler('email address already used', CONFLICT);

        const hashedPassword = await hash(password, 8);

        const newUser: User = userRepository.create({
            name,
            email,
            role,
            active,
            password: hashedPassword,
        });

        await userRepository.save(newUser);

        return newUser;
    }

    public async destroy(id: string): Promise<void> {
        const userRepository = getRepository(User);

        const user = await userRepository.findOne(id);

        if (!user) throw new Handler('user not found', NOT_FOUND);

        await userRepository.delete(id);
    }
}

export default UserService;
