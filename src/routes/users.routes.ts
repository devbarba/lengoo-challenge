import { Router, Request, Response, NextFunction } from 'express';

import UserController from '../controllers/users.controller';

const userController = new UserController();

const usersRouter = Router();

usersRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
    userController.list({ req, res, next });
});

export default usersRouter;
