import { ISubtitle, SubtitleStatus } from '@interfaces/subtitle';
import { Document, ObjectId } from 'mongodb';
import { Model, model, Schema } from 'mongoose';

interface ISubtitleModel extends ISubtitle, Document {}

const Subtitle = new Schema(
    {
        _user: {
            type: ObjectId,
            ref: 'User',
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
        file: {
            type: Schema.Types.Mixed,
            required: true,
        },
        status: {
            type: String,
            enum: SubtitleStatus,
            default: SubtitleStatus.PENDING,
            required: true,
        },
    },
    { timestamps: true }
);

const SubtitleModel: Model<ISubtitleModel> = model<
    ISubtitleModel,
    Model<ISubtitleModel>
>('Subtitle', Subtitle);

export default SubtitleModel;
