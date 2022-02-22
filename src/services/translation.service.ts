import { ITranslation } from '@interfaces/translation';
import Translation from '@models/Translation';

interface ITranslationService {
    create(translations: ITranslation[]): Promise<ITranslation[]>;
}

class TranslationService implements ITranslationService {
    public async create(translations: ITranslation[]): Promise<ITranslation[]> {
        return Promise.all(
            translations.map((translation) =>
                Translation.findOneAndUpdate(translation, translation, {
                    upsert: true,
                    new: true,
                })
            )
        );
    }
}

export default TranslationService;
