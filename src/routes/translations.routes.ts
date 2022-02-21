import TranslationController from '@controllers/translations.controller';
import ensureAuthenticated from '@middlewares/authenticated.middleware';
import { verifyFields } from '@utils/helper';
import { Router, Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const translationController = new TranslationController();

const translationsRouter = Router();

translationsRouter.use(ensureAuthenticated);

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

        translationController.insert({ req, res, next });
    }
);

export default translationsRouter;
