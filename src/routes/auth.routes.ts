import AuthController from '@controllers/auth.controller';
import { verifyFields } from '@utils/helper';
import { Router, Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const authController = new AuthController();

const authRouter = Router();

authRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
    verifyFields(
        req.body,
        Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(4).alphanum().required(),
        })
    );

    authController.login({ req, res, next });
});

export default authRouter;
