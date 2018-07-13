'use strict';

module.exports = app => {
    const {router, controller} = app;
    const auth = app.middlewares.auth();//校验用户token中间件 {auth.isLogin}

    router.get('/api/userInfo/:userId', 'api.user.getUser');//获取用户信息
};
