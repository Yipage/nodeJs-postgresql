'use strict';
const jwt = require('jsonwebtoken');

/**
 * @desc TOKEN校验中间件
 * @author padipata
 * @date 2018/7/13
 */
const isLogin = async function (next) {
    const token = this.request.header.authorization;
    if (!token) {
        this.response.status = 401;
        this.response.body = 'token不能为空';
        return;
    }
    // 验证token是否过期
    try {
        const info = jwt.verify(token.split('Bearer_')[1], this.app.config.jwtSecret);
        const exp = info.exp; // 过期时间
        const now = parseInt(new Date().getTime() / 1000);
        // 有效期小于一小时的重新赋值token
        const isOver = exp - now < 60 * 60;
        if (isOver) {
            const token = jwt.sign({uuId: info.uuId}, this.app.config.jwtSecret, {expiresIn: '7d'});
            this.set('authorization', 'Bearer_' + token);
        }
    } catch (err) {
        this.response.status = 401;
        // token过期
        if (err.name === 'TokenExpiredError') {
            this.response.body = 'token过期';
        } else if (err.name === 'JsonWebTokenError') {
            this.response.body = 'token无效';
        }
        return;
    }
    await next;
};

module.exports = () => {
    return {
        isLogin,
    };
};