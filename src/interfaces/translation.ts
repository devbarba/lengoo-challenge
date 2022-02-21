import { ObjectId } from 'mongodb';

enum AcceptedLanguages {
    DE = 'de',
    EN = 'en',
}

interface ITranslation {
    _id?: ObjectId;
    _user: ObjectId;
    source: string;
    target: string;
    sourceLanguage: AcceptedLanguages;
    targetLanguage: AcceptedLanguages;
}

export { ITranslation, AcceptedLanguages };
