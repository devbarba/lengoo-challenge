import SubtitleUploadJob from '@jobs/subtitles.job';
import { getEnv } from '@utils/helper';
import dotenv from 'dotenv-safe';
import { Application } from 'express';
import kue, { Job, DoneCallback } from 'kue';
import kueUi from 'kue-ui';
import cronJob from 'node-cron';

dotenv.config();

const Queue = kue.createQueue({
    redis: {
        host: getEnv('REDIS_HOST', '', true),
        port: getEnv('REDIS_PORT', '', true),
        auth: getEnv('REDIS_PASS', '', true),
    },
});

const translationQueue = () => {
    Queue.process('subtitles_upload', 1, (job: Job, done: DoneCallback) => {
        SubtitleUploadJob(job.data);
        done();
    });
};

const loadQueueUi = (server: Application) => {
    server.use('/queues/', kueUi.app);
    server.use('/queues/api', kue.app);
    kueUi.setup({
        apiURL: '/queues/api',
        baseURL: '/queues',
    });
};

const loadCron = () => {
    cronJob.schedule('*/10 * * * * *', () => {
        translationQueue();
    });
};

export { Queue, loadQueueUi, loadCron };
