import app from '@app';
import * as dotenv from 'dotenv-safe';
import { OK } from 'http-status';
import mongoose from 'mongoose';
import path from 'path';
import request from 'supertest';

import { token } from '../__mocks__/token.mock';

describe('[POST] - /api/subtitles/upload', () => {
    const endpointToCall = '/api/subtitles/upload';

    beforeAll(() => {
        process.env.NODE_ENV = 'test';
        dotenv.config();
    }, 100000);

    afterAll(async () => {
        await mongoose.disconnect();
    });

    test('This should send subtitles to translate with no errors and retrieve token', async () => {
        expect.assertions(3);
        const response = await request(app.server)
            .post(endpointToCall)
            .field('sourceLanguage', 'en')
            .field('targetLanguage', 'de')
            .attach(
                'files',
                path.resolve(__dirname, '../__mocks__/subtitles.mock.txt')
            )
            .set('Content-Type', 'multipart/form-data')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(OK);
        expect(response.body).toBeDefined();
        expect(response.body).toMatchObject({
            msg: 'subtitles sent to translate, you will receive in your registered email when we finish the job',
        });
    });
});
