import { Router, Request, Response, NextFunction } from 'express';
import Joi from 'joi';

import { verifyFields } from '../utils/helper';

const translationsRouter = Router();

translationsRouter.post(
    '/insert',
    (req: Request, res: Response, next: NextFunction) => {
        verifyFields(
            req.body,
            Joi.array()
                .items(
                    Joi.object({
                        source: Joi.string().required(),
                        target: Joi.string().required(),
                        sourceLanguage: Joi.string().min(2).max(2).required(),
                        targetLanguage: Joi.string().min(2).max(2).required(),
                    }).required()
                )
                .required()
        );
    }
);

export default translationsRouter;
