import app from '@app';
import request from 'supertest';

export let token: string;

beforeAll((done) => {
    request(app.server)
        .post('/api/auth')
        .send({
            email: 'challenge@lengoo.com',
            password: '123456',
        })
        .end((err, response) => {
            token = response.body.data.token;
            done();
        });
});
