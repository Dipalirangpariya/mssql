"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const sequelize_1 = require("sequelize");
class UserModel extends sequelize_1.Model {
}
exports.UserModel = UserModel;
function default_1(sequelize) {
    UserModel.init({
        userId: {
            type: sequelize_1.DataTypes.UUID,
            primaryKey: true,
            defaultValue: sequelize_1.UUIDV1
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: true
        },
        verified: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: true
        },
        createdAt: {
            type: sequelize_1.DataTypes.DATE,
            defaultValue: sequelize_1.DataTypes.NOW,
        },
        updatedAt: {
            type: sequelize_1.DataTypes.DATE,
            defaultValue: sequelize_1.DataTypes.NOW
        }
    }, {
        sequelize,
        tableName: "Usermysql"
    });
    return UserModel;
}
exports.default = default_1;
//# sourceMappingURL=User.js.map