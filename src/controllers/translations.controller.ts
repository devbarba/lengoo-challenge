import { OK } from 'http-status';

import { IRoute, IResponse } from '../interfaces/route';
import { ITranslation } from '../interfaces/translation';
import TranslationService from '../services/translation.service';

interface ITranslationController {
    insert({ req, res, next }: IRoute): Promise<IResponse<ITranslation[]>>;
}

class TranslationController implements ITranslationController {
    private translationService: TranslationService;

    constructor() {
        this.translationService = new TranslationService();
    }

    public async insert({
        req,
        res,
        next,
    }: IRoute): Promise<IResponse<ITranslation[]>> {
        try {
            const translations = req.body;

            const insertedTranslations = await this.translationService.insert(
                translations.map((trn) => {
                    return {
                        _user: req.user.id,
                        source: trn.source,
                        target: trn.target,
                        sourceLanguage: trn.sourceLanguage,
                        targetLanguage: trn.targetLanguage,
                    };
                })
            );

            return res.status(OK).json({
                msg: 'Successfully inserted translations',
                data: insertedTranslations,
            });
        } catch (error) {
            return next(error);
        }
    }
}

export default TranslationController;
