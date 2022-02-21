import authRouter from '@routes/auth.routes';
import translationsRouter from '@routes/translations.routes';
import usersRouter from '@routes/users.routes';
import { Router, Response, Request } from 'express';
import { OK } from 'http-status';

const routes = Router();

routes.get('/', (req: Request, res: Response) =>
    res.status(OK).json({ timestamp: Date.now().toString() })
);

routes.use('/auth', authRouter);
routes.use('/users', usersRouter);
routes.use('/translations', translationsRouter);

export default routes;
