import app from '@app';
import { IRoute, IResponse } from '@interfaces/route';
import { ISubtitle } from '@interfaces/subtitle';
import { OK } from 'http-status';

interface ISubtitleController {
    create({ req, res, next }: IRoute): Promise<IResponse<void>>;
}

class SubtitleController implements ISubtitleController {
    public async create({ req, res, next }: IRoute): Promise<IResponse<void>> {
        try {
            const languages: ISubtitle = req.body;

            if (req.files && app.queue && app.queue.queue !== undefined) {
                // @ts-ignore
                req.files.forEach((file) => {
                    app.queue.queue
                        .create('subtitles_upload', {
                            sourceLanguage: languages.sourceLanguage,
                            targetLanguage: languages.targetLanguage,
                            file,
                            _user: req.user.id,
                        })
                        .removeOnComplete(true)
                        .attempts(3)
                        .save();
                });
            }

            return res.status(OK).json({
                msg: 'subtitles sent to translate, you will receive in your registered email when we finish the job',
            });
        } catch (error) {
            return next(error);
        }
    }
}

export default SubtitleController;
