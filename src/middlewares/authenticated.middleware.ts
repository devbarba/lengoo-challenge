import Handler from '@errors/handler.error';
import app from '@app';
import { Request, Response, NextFunction } from 'express';
import { UNAUTHORIZED } from 'http-status';
import { JwtPayload, verify } from 'jsonwebtoken';

export default function ensureAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
): void {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new Handler('jwt token is missing', UNAUTHORIZED);
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = verify(token, app.configObject.app.jwt.secret);

        const { sub } = decoded as JwtPayload;

        req.user = {
            id: sub || '',
        };

        next();
    } catch (err) {
        throw new Handler('invalid jwt token', UNAUTHORIZED);
    }
}
