const request = require('supertest');

const server = require('../api/server.js');

describe('runs auth router tests', function () {
    it('should run the tests for the auth router', function () {
        expect(true).toBe(true);
    });
});

describe('POST /api/auth/register - CHANGE USER EVERY TIME', function () {
    it('should return a 201', function () {

        let user = {
            username: 'Jessica',
            password: 'password'
        }

        /* make sure to change username every time as test will fail
            if the account already exists in the database */
        return request(server)
            .post('/api/auth/register')
            .send({ username: 'Saitama2', password: 'password' })
            .then(res => {
                expect(res.status).toBe(201);
            });
    });

    it('should return JSON formatted body', function () {
        return request(server)
            .get('/api/jokes')
            .then(res => {
                expect(res.type).toMatch(/json/);
            });
    });
})