'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
    // 注册
    async register() {
        const name = this.ctx.request.body.name;
        const password = this.ctx.request.body.password;
        if (!name || !password) {
            this.ctx.status = 404;
            this.ctx.body = '用户名或者密码不能为空';
            return;
        }
        await this.ctx.service.user.register({name, password});
        this.ctx.status = 200;
        this.ctx.body = '注册成功'
    }

    // 登录
    async login() {
        const name = this.ctx.request.body.name;
        const password = this.ctx.request.body.password;
        if (!name || !password) {
            this.ctx.status = 400;
            this.ctx.body = '用户名或者密码不能为空';
            return;
        }
        const token = await this.ctx.service.user.login({name, password});
        this.ctx.status = 200;
        this.ctx.body = token;
    }

    // 获取用户列表
    async users() {
        this.ctx.body = await this.ctx.service.user.list(this.ctx.query);
    }

    // 用户信息
    async user() {
        this.ctx.body = await this.ctx.service.user.find(this.ctx.params.id);
    }

    // 更新用户信息
    async update() {
        const id = this.ctx.params.id;
        const body = this.ctx.request.body;
        this.ctx.body = await this.ctx.service.user.update({id, updates: body});
    }

    // 删除用户
    async del() {
        this.ctx.body = await this.ctx.service.user.del(this.ctx.params.id);
    }
}

module.exports = UserController;