import { ObjectId } from 'mongodb';

enum SubtitleStatus {
    PENDING = 'pending',
    PROCESSED = 'processed',
    SENT = 'sent',
    FAILED = 'failed',
}

interface ISubtitleFile {
    name: string;
    url: string;
}

interface ISubtitle {
    _id?: ObjectId;
    _user: ObjectId;
    sourceLanguage: string;
    targetLanguage: string;
    file: ISubtitleFile;
    status: SubtitleStatus;
}

export { ISubtitle, ISubtitleFile, SubtitleStatus };
