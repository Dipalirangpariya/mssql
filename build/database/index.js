"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbUser = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("../config");
const User_1 = __importDefault(require("./model/User"));
exports.sequelize = new sequelize_1.Sequelize(`${config_1.db.name}`, `${config_1.db.user}`, `${config_1.db.password}`, {
    host: `${config_1.db.host}`,
    dialect: 'mssql',
});
exports.dbUser = {
    User: (0, User_1.default)(exports.sequelize),
    sequelize: exports.sequelize,
    Sequelize: sequelize_1.Sequelize
};
exports.sequelize.authenticate().then(async () => {
    console.log('Connection has been established successfully.');
    await exports.dbUser.User.sync();
}).catch((err) => {
    console.error('Unable to connect to the database:', err);
});
//# sourceMappingURL=index.js.map