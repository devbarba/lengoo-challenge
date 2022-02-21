import { ITranslation } from '@interfaces/translation';
import { Document, ObjectId } from 'mongodb';
import { Model, model, Schema } from 'mongoose';

interface ITranslationModel extends ITranslation, Document {}

const Translation = new Schema(
    {
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
            min: 2,
            max: 2,
            required: true,
        },
        targetLanguage: {
            type: String,
            min: 2,
            max: 2,
            required: true,
        },
    },
    { timestamps: true }
);

const TranslationModel: Model<ITranslationModel> = model<
    ITranslationModel,
    Model<ITranslationModel>
>('Translation', Translation);

export default TranslationModel;
