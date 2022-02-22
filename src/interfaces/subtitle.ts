import { ObjectId } from 'mongodb';

enum SubtitleStatus {
    PENDING = 'pending',
    PROCESSED = 'processed',
    SENT = 'sent',
    FAILED = 'failed',
}

interface ISubtitleFile {
    originalname?: string;
    buffer?: unknown;
}

interface ISubtitle {
    _id?: ObjectId;
    _user?: ObjectId;
    sourceLanguage: string;
    targetLanguage: string;
    file: string;
    status?: SubtitleStatus;
}

interface ISubtitleUploadJob {
    sourceLanguage: string;
    targetLanguage: string;
    file: unknown;
    _user: ObjectId | string;
}
export { ISubtitle, ISubtitleFile, SubtitleStatus, ISubtitleUploadJob };
