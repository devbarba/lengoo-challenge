import SubtitleController from '@controllers/subtitles.controller';
import ensureAuthenticated from '@middlewares/authenticated.middleware';
import { verifyFields } from '@utils/helper';
import { Router, Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import Multer from 'multer';

const subtitlesController = new SubtitleController();

const subtitlesRoutes = Router();

subtitlesRoutes.use(ensureAuthenticated);

subtitlesRoutes.post(
    '/upload',
    Multer({ storage: Multer.memoryStorage() }).array('files'),
    (req: Request, res: Response, next: NextFunction) => {
        verifyFields(
            { ...req.body, files: req.files },
            Joi.object({
                sourceLanguage: Joi.string().min(2).max(2).required(),
                targetLanguage: Joi.string().min(2).max(2).required(),
                files: Joi.array()
                    .items(
                        Joi.object({
                            fieldname: Joi.string().required(),
                            originalname: Joi.string()
                                .pattern(/\.(txt)$/)
                                .required(),
                            encoding: Joi.string().required(),
                            mimetype: Joi.string()
                                .valid('text/plain')
                                .required(),
                            buffer: Joi.any().required(),
                            size: Joi.number().required(),
                        }).required()
                    )
                    .required(),
            }).required()
        );
        subtitlesController.create({ req, res, next });
    }
);

export default subtitlesRoutes;
