import { Router, Response, Request } from 'express';
import { OK } from 'http-status';

const routes = Router();

routes.get('/', (req: Request, res: Response) =>
    res.status(OK).json({ timestamp: Date.now().toString() })
);

export default routes;
