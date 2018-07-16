'use strict';

const Service = require('egg').Service;

class User extends Service {
    /**
     * 获取用户列表
     * @param offset
     * @param limit
     * @param order_by
     * @param order
     * @return {Promise<*>}
     */
    async list({offset = 0, limit = 10, order_by = 'created_at', order = 'ASC'}) {
        return this.ctx.model.User.findAndCountAll({
            offset,
            limit,
            order: [[order_by, order.toUpperCase()]],
        });
    }

    /**
     * 获取用户信息
     * @param id
     * @return {Promise<*>}
     */
    async find(id) {
        const user = await this.ctx.model.User.findById(id);
        if (!user) {
            this.ctx.throw(404, '用户不存在');
        }
        return user;
    }

    /**
     * 创建用户
     * @param user
     * @return {Promise<user>}
     */
    async create(user) {
        return this.ctx.model.User.create(user);
    }

    /**
     * 更新用户信息
     * @param id
     * @param updates
     * @return {Promise<*>}
     */
    async update({id, updates}) {
        const user = await this.ctx.model.User.findById(id);
        if (!user) {
            this.ctx.throw(404, '用户不存在');
        }
        return user.update(updates);
    }

    /**
     * 删除用户
     * @param id
     * @return {Promise<*>}
     */
    async del(id) {
        const user = await this.ctx.model.User.findById(id);
        if (!user) {
            this.ctx.throw(404, '用户不存在');
        }
        return user.destroy();
    }
}

module.exports = User;