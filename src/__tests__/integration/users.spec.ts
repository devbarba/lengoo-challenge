import app from '@app';
import { IUser } from '@interfaces/user';
import * as dotenv from 'dotenv-safe';
import {
    CONFLICT,
    CREATED,
    NOT_FOUND,
    NO_CONTENT,
    OK,
    UNAUTHORIZED,
} from 'http-status';
import mongoose from 'mongoose';
import request from 'supertest';

import { validationResponses } from '../__mocks__/payloads.mock';
import { token } from '../__mocks__/token.mock';

describe('/api/users', () => {
    const endpointToCall = '/api/users';
    let userIdToDelete: string;
    const userMock = {
        name: 'Jest test',
        email: 'jest@lengoo.com',
        role: 'Client',
        password: '123456',
        password_confirmation: '123456',
    };

    beforeAll(() => {
        process.env.NODE_ENV = 'test';
        dotenv.config();
    }, 100000);

    afterAll(async () => {
        await mongoose.disconnect();
    });

    describe('[GET] - /api/users', () => {
        test('This should retrieve users', async () => {
            expect.assertions(4);
            const response = await request(app.server)
                .get(endpointToCall)
                .set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(OK);
            expect(response.body).toBeDefined();
            expect(response.body.data).toBeDefined();
            expect(response.body.data).toMatchObject({} as IUser[]);
        });

        test('This should return `401` jwt token is missing', async () => {
            expect.assertions(3);
            const response = await request(app.server).get(endpointToCall);

            expect(response.status).toBe(UNAUTHORIZED);
            expect(response.body).toBeDefined();
            expect(response.body).toMatchObject({
                msg: 'jwt token is missing',
            });
        });

        test('This should return `401` invalid jwt token', async () => {
            expect.assertions(3);
            const response = await request(app.server)
                .get(endpointToCall)
                .set('Authorization', 'invalid');

            expect(response.status).toBe(UNAUTHORIZED);
            expect(response.body).toBeDefined();
            expect(response.body).toMatchObject({
                msg: 'invalid jwt token',
            });
        });
    });

    describe('[POST] - /api/users', () => {
        test('This should create a user', async () => {
            expect.assertions(4);
            const response = await request(app.server)
                .post(endpointToCall)
                .set('Authorization', `Bearer ${token}`)
                .send(userMock);

            userIdToDelete = response.body.data._id;
            expect(response.status).toBe(CREATED);
            expect(response.body).toBeDefined();
            expect(response.body.data).toBeDefined();
            expect(response.body.data).toMatchObject({} as IUser);
        });

        test('This should not create a user cause already exists', async () => {
            expect.assertions(3);
            const response = await request(app.server)
                .post(endpointToCall)
                .set('Authorization', `Bearer ${token}`)
                .send(userMock);

            expect(response.status).toBe(CONFLICT);
            expect(response.body).toBeDefined();
            expect(response.body).toMatchObject({
                msg: 'email address already used',
            });
        });
    });

    describe('[DELETE] - /api/users', () => {
        test('This should remove a user', async () => {
            expect.assertions(2);
            const response = await request(app.server)
                .delete(`${endpointToCall}/${userIdToDelete}`)
                .set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(NO_CONTENT);
            expect(response.body).toBeDefined();
        });

        test('This should not remove user, cause not exists', async () => {
            expect.assertions(3);
            const response = await request(app.server)
                .delete(`${endpointToCall}/${userIdToDelete}`)
                .set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(NOT_FOUND);
            expect(response.body).toBeDefined();
            expect(response.body).toMatchObject({
                msg: 'user not found',
            });
        });
    });
});
