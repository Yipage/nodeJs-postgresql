'use strict';

const Service = require('egg').Service;
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

module.exports = app => {
    class User extends app.Service {
        // 注册
        async register(user) {
            if (await this.hasRegister(user.name)) {
                this.ctx.throw(404, '用户已存在');
            }
            user.password = crypto.createHash('md5').update(user.password).digest('hex');
            return await this.ctx.model.User.create(user);
        }

        // 登录
        async login(user) {
            user.password = crypto.createHash('md5').update(user.password).digest('hex');
            const user_id = await this.checkUser(user.name, user.password);
            if (user_id !== false) {
                const token = jwt.sign({user_id: user_id}, this.app.config.jwtSecret, {expiresIn: '7d'});
                this.ctx.set('authorization', 'Bearer_' + token);
                return `Bearer_${token}`;
            }
            this.ctx.throw(404, '用户名或密码错误');
        }

        // 获取用户列表
        async list({offset = 0, limit = 10, order_by = 'created_at', order = 'ASC'}) {
            const users = await this.ctx.model.User.findAndCountAll({
                offset,
                limit,
                order: [[order_by, order.toUpperCase()]],
            });
            if (!users || users.length === 0) {
                this.ctx.throw(404, '暂无用户');
            }
            return users;
        }

        // 获取用户信息
        async find(user_id) {
            const user = await this.ctx.model.User.findById(user_id);
            if (!user) {
                this.ctx.throw(404, '用户不存在');
            }
            return user;
        }

        // 更新用户信息
        async update({id, updates}) {
            const user = await this.ctx.model.User.findById(id);
            if (!user) {
                this.ctx.throw(404, '用户不存在');
            }
            return user.update(updates);
        }

        //删除用户
        async del(id) {
            const user = await this.ctx.model.User.findById(id);
            if (!user) {
                this.ctx.throw(404, '用户不存在');
            }
            return user.destroy();
        }


        // 该账号是否已经注册
        async hasRegister(name) {
            const user = await this.ctx.model.User.findOne({name});
            if (user && user.user_id) {
                return true;
            }
            return false;
        }

        // 验证账号密码是否正确
        async checkUser(name, password) {
            const user = await this.ctx.model.User.findOne(
                {where: {name: name, password: password}} //查询条件
            );
            if (user && user.dataValues.user_id) {
                return user.dataValues.user_id;
            }
            return false;
        }

    }

    return User;
};