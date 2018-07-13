'use strict';

module.exports = app => {
    const {router, controller} = app;

    //校验用户token中间件 {auth.isLogin}
    const auth = app.middlewares.auth();

    app.router.get('/api/v2/users', 'api.user.users');//用户列表
    app.router.get('/api/v2/users/:id', 'api.user.user');//用户信息
    app.router.post('/api/v2/users', 'api.user.create');//创建用户
    app.router.put('/api/v2/users/:id', 'api.user.update');//更新用户
    app.del('/api/v2/users/:id', 'api.user.del');//删除用户


};
