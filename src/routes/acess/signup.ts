import express from "express";
import upload from "../helpers/fileUpload";
import { BadRequestError } from "../../core/ApiError";
import { SuccessResponse } from "../../core/ApiReaponse";
import { UserModel } from "../../database/model/User";
import UserRepo from "../../database/repository/userrepo";
import asyncHandler from '../helpers/asyncHandler';

const router = express.Router();
router.post(
    '/basic',
    asyncHandler(async (req, res) => {
      const user = await UserRepo.findByEmail(req.body.email);
      if (user) throw new BadRequestError('User already registered');
      const { user: createdUser} = await UserRepo.create(
        {
          name: req.body.name,email: req.body.email,password: req.body.password    
        }as UserModel,
        req.body.roleid
      );
      new SuccessResponse('Signup Successful', {
        user: createdUser   
       }).send(res);
    }),
  );
  





  export default router;