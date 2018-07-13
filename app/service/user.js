'use strict';
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

module.exports = app => {
    class UserService extends app.Service {
        // 获取用户信息
        async getUserById(userId) {
            const user = await app.model.User.findOne({userId}, '-_id -password -__v');
            if (user) {
                return user;
            }
            throw new Error('用户不存在');
        }
    }

    return UserService;
};
