import SubtitleController from '@controllers/subtitles.controller';
import ensureAuthenticated from '@middlewares/authenticated.middleware';
import { verifyFields } from '@utils/helper';
import { Router, Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const subtitlesController = new SubtitleController();

const subtitlesRoutes = Router();

subtitlesRoutes.use(ensureAuthenticated);

subtitlesRoutes.post(
    '/upload',
    (req: Request, res: Response, next: NextFunction) => {
        verifyFields(
            { ...req.body, ...req.files },
            Joi.object({
                sourceLanguage: Joi.string().min(2).max(2).required(),
                targetLanguage: Joi.string().min(2).max(2).required(),
                file: {
                    name: Joi.string()
                        .pattern(/\.(txt)$/)
                        .required(),
                    data: Joi.any().required(),
                    size: Joi.number().required(),
                    encoding: Joi.string().required(),
                    tempFilePath: Joi.string().allow(null, ''),
                    truncated: Joi.boolean().required(),
                    mimetype: Joi.string().valid('text/plain').required(),
                    md5: Joi.string().required(),
                    mv: Joi.function(),
                },
            }).required()
        );

        subtitlesController.create({ req, res, next });
    }
);

export default subtitlesRoutes;
