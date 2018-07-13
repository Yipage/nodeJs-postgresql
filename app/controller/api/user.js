'use strict';

module.exports = app => {
    class UserController extends app.Controller {
        // 用户信息
        async getUser() {
            const userId = this.ctx.request.user.userId;
            // const user = await this.ctx.service.user.getUserById(userId);
            this.ctx.body = user;
        }


    }

    return UserController;
};

