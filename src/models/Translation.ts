import { Document, ObjectId } from 'mongodb';
import { Model, model, Schema } from 'mongoose';

import { ITranslation, AcceptedLanguages } from '../interfaces/translation';

interface ITranslationModel extends ITranslation, Document {}

const Translation = new Schema({
    _user: {
        type: ObjectId,
        ref: 'User',
        required: true,
    },
    source: {
        type: String,
        required: true,
    },
    target: {
        type: String,
        required: true,
    },
    sourceLanguage: {
        type: String,
        enum: AcceptedLanguages,
        required: true,
    },
    targetLanguage: {
        type: String,
        enum: AcceptedLanguages,
        required: true,
    },
});

const TranslationModel: Model<ITranslationModel> = model<
    ITranslationModel,
    Model<ITranslationModel>
>('Translation', Translation);

export default TranslationModel;
