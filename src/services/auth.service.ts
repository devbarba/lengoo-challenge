import { compare } from 'bcryptjs';
import { UNPROCESSABLE_ENTITY } from 'http-status';
import { sign } from 'jsonwebtoken';
import { getRepository } from 'typeorm';

import app from '../app';
import Handler from '../errors/handler.error';
import { IAuthRequest, IAuthResponse } from '../interfaces/auth';
import User from '../models/User';

interface IAuthService {
    login({ email, password }: IAuthRequest): Promise<IAuthResponse>;
}

class AuthService implements IAuthService {
    public async login({
        email,
        password,
    }: IAuthRequest): Promise<IAuthResponse> {
        const user: User | undefined = await getRepository(User).findOne({
            where: email,
        });

        if (!user)
            throw new Handler(
                'incorrect email/password combination',
                UNPROCESSABLE_ENTITY
            );

        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched)
            throw new Handler(
                'incorrect email/password combination',
                UNPROCESSABLE_ENTITY
            );

        const token = sign({}, app.configObject.app.jwt.secret, {
            subject: user._id.toString(),
            expiresIn: app.configObject.app.jwt.ttl,
        });

        return { token };
    }
}

export default AuthService;