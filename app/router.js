'use strict';

module.exports = app => {
    const {router} = app;

    //校验用户token中间件 {auth.isLogin}
    const auth = app.middlewares.auth();

    router.post('/api/v2/register', 'api.user.register');//注册
    router.post('/api/v2/login', 'api.user.login');//登录
    router.get('/api/v2/users', 'api.user.users');//用户列表
    router.get('/api/v2/user/:id', 'api.user.user');//用户信息
    router.put('/api/v2/user/:id', 'api.user.update');//更新用户
    app.del('/api/v2/user/:id', 'api.user.del');//删除用户

};
