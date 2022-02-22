import app from '@app';
import * as dotenv from 'dotenv-safe';
import { OK, UNAUTHORIZED, PRECONDITION_FAILED } from 'http-status';
import mongoose from 'mongoose';
import request from 'supertest';

import { validationResponses } from '../__mocks__/payloads.mock';

describe('[POST] - /api/auth', () => {
    const endpointToCall = '/api/auth';
    const email = 'challenge@lengoo.com';

    beforeAll(() => {
        process.env.NODE_ENV = 'test';
        dotenv.config();
    }, 100000);

    afterAll(async () => {
        await mongoose.disconnect();
    });

    test('This should get logged with no errors and retrieve token', async () => {
        expect.assertions(3);
        const response = await request(app.server).post(endpointToCall).send({
            email: 'challenge@lengoo.com',
            password: '123456',
        });
        expect(response.status).toBe(OK);
        expect(response.body).toBeDefined();
        expect(response.body).toMatchObject({
            data: { token: expect.any(String) },
        });
    });

    test('This should not get logged with UNAUTHORIZED satus', async () => {
        expect.assertions(3);
        const response = await request(app.server).post(endpointToCall).send({
            email,
            password: '1234567',
        });
        expect(response.status).toBe(UNAUTHORIZED);
        expect(response.body).toBeDefined();
        expect(response.body).toMatchObject({
            msg: 'incorrect email/password combination',
        });
    });

    test('This should not get logged cause missing field', async () => {
        expect.assertions(3);
        const response = await request(app.server).post(endpointToCall).send({
            email,
        });
        expect(response.status).toBe(PRECONDITION_FAILED);
        expect(response.body).toBeDefined();
        expect(response.body).toMatchObject({
            msg: `password ${validationResponses[1]}`,
        });
    });
});
