import app from '@app';
import * as dotenv from 'dotenv-safe';
import { OK } from 'http-status';
import mongoose from 'mongoose';
import request from 'supertest';

describe('[GET] - /api', () => {
    const endpointToCall = '/api';

    beforeAll(() => {
        process.env.NODE_ENV = 'test';
        dotenv.config();
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });

    test('This should load with no errors', async () => {
        expect.assertions(2);
        const response = await request(app.server).get(endpointToCall);
        expect(response.status).toBe(OK);
        expect(response.body).toMatchObject({
            timestamp: expect.any(String),
        });
    });

    test('This should allow cors', async () => {
        expect.assertions(1);
        const response = await request(app.server).options(endpointToCall);
        expect(response.header['access-control-allow-origin']).toBe('*');
    });
});
