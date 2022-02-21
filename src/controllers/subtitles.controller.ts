import { IRoute, IResponse } from '@interfaces/route';
import { OK } from 'http-status';

interface ISubtitleController {
    create({ req, res, next }: IRoute): Promise<IResponse<void>>;
}

class SubtitleController implements ISubtitleController {
    public async create({ req, res, next }: IRoute): Promise<IResponse<void>> {
        try {
            return res.status(OK).json({
                msg: 'subtitles sent to translate, you will receive in your registered email when we finish the job',
            });
        } catch (error) {
            return next(error);
        }
    }
}

export default SubtitleController;
