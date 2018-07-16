'use strict';

module.exports = app => {
    const {STRING, INTEGER, DATE} = app.Sequelize;

    const User = app.model.define('user', {
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

    // User.prototype.associate = function() {
    //     app.model.User.hasMany(app.model.Post, { as: 'posts', foreignKey: 'user_id' });
    // };

    return User;
};