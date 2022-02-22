import app from '@app';
import { IUser } from '@interfaces/user';
import * as dotenv from 'dotenv-safe';
import { OK, PRECONDITION_FAILED } from 'http-status';
import mongoose from 'mongoose';
import request from 'supertest';

import { validationResponses } from '../__mocks__/payloads.mock';
import { token } from '../__mocks__/token.mock';

describe('[POST] - /api/translations', () => {
    const endpointToCall = '/api/translations';
    const translation = [
        {
            source: 'Hello',
            target: 'Hallo',
            sourceLanguage: 'en',
            targetLanguage: 'de',
        },
    ];

    beforeAll(() => {
        process.env.NODE_ENV = 'test';
        dotenv.config();
    }, 100000);

    afterAll(async () => {
        await mongoose.disconnect();
    });

    test('This should insert a translation with no errors and retrieve token', async () => {
        expect.assertions(3);
        const response = await request(app.server)
            .post(endpointToCall)
            .send(translation)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(OK);
        expect(response.body).toBeDefined();
        expect(response.body).toMatchObject({
            msg: 'successfully inserted translations',
            data: {} as IUser[],
        });
    });

    test('This should not insert translation cause are missing target field', async () => {
        expect.assertions(3);
        const response = await request(app.server)
            .post(endpointToCall)
            .send([{ source: 'a' }])
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(PRECONDITION_FAILED);
        expect(response.body).toBeDefined();
        expect(response.body).toMatchObject({
            msg: `[0].target ${validationResponses[1]}`,
        });
    });
});
