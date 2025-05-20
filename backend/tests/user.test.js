const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

describe('User API', () => {
    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should not register with invalid email', async () => {
        const res = await request(app)
            .post('/api/register')
            .send({ name: 'Test', email: 'bademail', password: 'pass123' });
        expect(res.statusCode).toBe(400);
        expect(res.body.errors).toBeDefined();
    });
});