import { hash } from 'bcryptjs';
import { NOT_FOUND, CONFLICT } from 'http-status';

import Handler from '../errors/handler.error';
import { IUser } from '../interfaces/user';
import User from '../models/User';

interface IUserService {
    list(): Promise<IUser[]>;
    create({ name, email, role, active, password }: IUser): Promise<IUser>;
    destroy(id: string): Promise<void>;
}

class UserService implements IUserService {
    public async list(): Promise<IUser[]> {
        const users: IUser[] = await User.find();

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
    }: IUser): Promise<IUser> {
        const user = await User.findOne({ where: email });

        if (user) throw new Handler('email address already used', CONFLICT);

        const hashedPassword = await hash(password, 8);

        const newUser = User.create({
            name,
            email,
            role,
            active,
            password: hashedPassword,
        });

        return newUser;
    }

    public async destroy(id: string): Promise<void> {
        const user = await User.findOne({ where: id });

        if (!user) throw new Handler('user not found', NOT_FOUND);

        await User.remove({ where: id });
    }
}

export default UserService;
