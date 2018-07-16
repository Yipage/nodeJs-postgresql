'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
    // 注册
    async register() {
        const ctx = this.ctx;
        const name = ctx.request.body.name;
        const password = ctx.request.body.password;
        if (!name || !password) {
            ctx.status = 404;
            ctx.body = '用户名或者密码不能为空';
            return;
        }
        await ctx.service.user.register({name, password});
        ctx.status = 200;
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
        const ctx = this.ctx;
        const users = await ctx.service.user.list();
        if (!users || users.length === 0) {
            ctx.status = 404;
            ctx.body = '当前用户为空';
            return;
        }
        ctx.status = 200;
        ctx.body = users;
    }

    // 用户信息
    async user() {
        const ctx = this.ctx;
        ctx.body = await ctx.service.user.find(ctx.params.id);
    }


    // 更新用户信息
    async update() {
        const ctx = this.ctx;
        const id = ctx.params.id;
        const body = ctx.request.body;
        ctx.body = await ctx.service.user.update({id, updates: body});
    }

    // 删除用户
    async del() {
        const ctx = this.ctx;
        const id = ctx.params.id;
        await ctx.service.user.del(id);
        ctx.status = 200;
    }
}

module.exports = UserController;