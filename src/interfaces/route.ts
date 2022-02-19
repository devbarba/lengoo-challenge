import { Request, Response } from 'express';

interface IRoute {
    req: Request;
    res: Response;
    next: CallableFunction;
}

interface IResponse<T> extends Response {
    data?: T;
    msg?: string;
}

export { IRoute, IResponse };
