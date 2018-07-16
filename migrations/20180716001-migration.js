'use strict';

const co = require('co');

module.exports = {
    up: co.wrap(function* (db, Sequelize) {
        const { INTEGER, DATE, STRING } = Sequelize;

        yield db.createTable('users', {
            user_id: {
                type: INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: STRING(30),
            password: STRING(255),
            age: {type: INTEGER, defaultValue: 0},
            sex: {type: STRING(2), defaultValue: '男'},
            created_at: DATE,
            updated_at: DATE,
        });
    }),

    down: co.wrap(function* (db) {
        yield db.dropTable('users');
    }),
};