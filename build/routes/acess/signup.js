"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ApiError_1 = require("../../core/ApiError");
const ApiReaponse_1 = require("../../core/ApiReaponse");
const userrepo_1 = __importDefault(require("../../database/repository/userrepo"));
const asyncHandler_1 = __importDefault(require("../helpers/asyncHandler"));
const router = express_1.default.Router();
router.post('/basic', (0, asyncHandler_1.default)(async (req, res) => {
    const user = await userrepo_1.default.findByEmail(req.body.email);
    if (user)
        throw new ApiError_1.BadRequestError('User already registered');
    const { user: createdUser } = await userrepo_1.default.create({
        name: req.body.name, email: req.body.email, password: req.body.password
    }, req.body.roleid);
    new ApiReaponse_1.SuccessResponse('Signup Successful', {
        user: createdUser
    }).send(res);
}));
exports.default = router;
//# sourceMappingURL=signup.js.map