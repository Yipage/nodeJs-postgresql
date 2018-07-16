'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
    // 用户列表
    async users() {
        const ctx = this.ctx;
        const users = await ctx.service.user.list(ctx.query);
        if (!users || users.length === 0) {
            ctx.status = 404;
            ctx.body = '当前用户为空'
        }
        ctx.status = 200;
        ctx.body = users;
    }

    // 用户信息
    async user() {
        const ctx = this.ctx;
        ctx.body = await ctx.service.user.find(ctx.params.id);
    }

    // 创建用户
    async create() {
        const ctx = this.ctx;
        const created = await ctx.service.user.create(ctx.request.body);
        ctx.status = 200;
        ctx.body = created;
    }

    // 更新用户信息
    async update() {
        const ctx = this.ctx;
        const id = ctx.params.id;
        const body = ctx.request.body;
        ctx.body = await ctx.service.user.update({id, updates: body});
    }

    // 删除用户信息
    async del() {
        const ctx = this.ctx;
        const id = ctx.params.id;
        await ctx.service.user.del(id);
        ctx.status = 200;
    }
}

module.exports = UserController;