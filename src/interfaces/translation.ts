import { ObjectId } from 'mongodb';

interface ITranslation {
    _id?: ObjectId;
    _user: ObjectId;
    source: string;
    target: string;
    sourceLanguage: string;
    targetLanguage: string;
}

export { ITranslation };
