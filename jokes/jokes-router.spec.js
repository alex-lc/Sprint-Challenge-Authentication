const request = require('supertest');
const server = require('../api/server.js');

describe('it runs the jokes-router tests', () => {
    it('should run the jokes-router tests', () => {
        expect(true).toBe(true);
    });
});

describe('GET to /api/jokes', () => {
    it('should return 401 if we are not authorized', () => {
        return request(server)
            .get('/api/jokes')
            .then(res => {
                expect(res.status).toBe(401);
            });
    });
})

describe('GET to /api/jokes', () => {
    it('should return 200 and our list of jokes', () => {
        return request(server)
            .get('/api/jokes')
            .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluaXN0cmF0b3IiLCJpYXQiOjE1ODI5MDYxMjYsImV4cCI6MTU4Mjk5MjUyNn0.9UkxCyWAh34tu5q0s53BRSl3tLTaEAOKXqDhIEItViY')
            .then(res => {
                expect(res.status).toBe(200);
            });
    });
})