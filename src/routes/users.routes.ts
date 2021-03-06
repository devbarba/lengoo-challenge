import UserController from '@controllers/users.controller';
import ensureAuthenticated from '@middlewares/authenticated.middleware';
import { verifyFields } from '@utils/helper';
import { Router, Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const userController = new UserController();

const usersRouter = Router();

usersRouter.use(ensureAuthenticated);

usersRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
    userController.list({ req, res, next });
});

usersRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
    verifyFields(
        req.body,
        Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            role: Joi.string().valid('Client', 'Admin'),
            password: Joi.string().min(4).alphanum().required(),
            password_confirmation: Joi.string()
                .min(6)
                .alphanum()
                .valid(Joi.ref('password'))
                .required(),
        })
    );

    userController.create({ req, res, next });
});

usersRouter.delete(
    '/:id',
    async (req: Request, res: Response, next: NextFunction) => {
        userController.destroy({ req, res, next });
    }
);

export default usersRouter;
