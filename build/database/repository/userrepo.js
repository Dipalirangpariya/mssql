"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../model/User");
class UserRepo {
    findbyid(Id) {
        return User_1.UserModel.findOne({ where: { userId: Id } });
    }
    static findByEmail(email) {
        return User_1.UserModel.findOne({ where: { email: email, status: true } });
    }
    static findPublicProfileById(id) {
        return User_1.UserModel.findOne({ where: { userId: id, status: true } });
    }
    static async create(user, roleid) {
        const now = new Date();
        user.createdAt = now;
        user.updatedAt = now;
        const createdUser = await User_1.UserModel.create(user);
        return { user: createdUser };
    }
    static findProfileById(id) {
        return User_1.UserModel.findOne({ where: { userId: id, status: true } });
    }
}
exports.default = UserRepo;
//# sourceMappingURL=userrepo.js.map