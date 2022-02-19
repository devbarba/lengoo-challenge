import { Router, Response, Request } from 'express';
import { OK } from 'http-status';

import authRouter from './auth.routes';
import usersRouter from './users.routes';

const routes = Router();

routes.get('/', (req: Request, res: Response) =>
    res.status(OK).json({ timestamp: Date.now().toString() })
);

routes.use('/auth', authRouter);
routes.use('/users', usersRouter);

export default routes;
