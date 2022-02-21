import { ObjectId } from 'mongodb';

enum SubtitleStatus {
    PENDING = 'pending',
    PROCESSED = 'processed',
    SENT = 'sent',
    FAILED = 'failed',
}

interface ISubtitleFile {
    name: string;
    originalname?: string;
    buffer?: unknown;
    url: string;
}

interface ISubtitle {
    _id?: ObjectId;
    _user?: ObjectId;
    sourceLanguage: string;
    targetLanguage: string;
    files: ISubtitleFile;
    status?: SubtitleStatus;
}

interface ISubtitleUploadJob {
    sourceLanguage: string;
    targetLanguage: string;
    file: unknown;
    _user: ObjectId | string;
}
export { ISubtitle, ISubtitleFile, SubtitleStatus, ISubtitleUploadJob };
