import authRouter from '@routes/auth.routes';
import subtitlesRouter from '@routes/subtitles.routes';
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
routes.use('/subtitles', subtitlesRouter);

export default routes;
