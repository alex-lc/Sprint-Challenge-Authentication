const db = require('../database/dbConfig');

module.exports = {
    register,
    findBy
}

function register(user) {
    return db('users').insert(user, 'id');
}

function findBy(filter) {
    return db('users')
        .select('id', 'username', 'password')
        .where(filter);
}