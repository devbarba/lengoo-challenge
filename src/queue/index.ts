import app from '@app';
import SubtitleUploadJob from '@jobs/subtitles.job';
import TranslationProcessJob from '@jobs/translations.job';
import { getEnv } from '@utils/helper';
import dotenv from 'dotenv-safe';
import kue, { Job, DoneCallback } from 'kue';
import cronJob from 'node-cron';

dotenv.config();

class Queue {
    public queue: kue.Queue;

    constructor() {
        if (process.env.NODE_ENV !== 'test') {
            this.queue = kue.createQueue({
                redis: {
                    host: getEnv('REDIS_HOST', '', true),
                    port: getEnv('REDIS_PORT', '', true),
                    auth: getEnv('REDIS_PASS', '', true),
                },
            });
            this.queue.setMaxListeners(this.queue.getMaxListeners() + 1);
            this.loadCron();
        }
    }

    protected subtitleQueue() {
        this.queue.process(
            'subtitles_upload',
            1,
            (job: Job, done: DoneCallback) => {
                SubtitleUploadJob(job.data);
                done();
            }
        );
    }

    protected translationQueue() {
        this.queue.process(
            'translation_process',
            1,
            (job: Job, done: DoneCallback) => {
                TranslationProcessJob(job.data);
                done();
            }
        );
    }

    protected loadCron() {
        cronJob.schedule('* * * * * *', () => {
            this.subtitleQueue();
            this.translationQueue();
        });
    }
}

export default new Queue();
