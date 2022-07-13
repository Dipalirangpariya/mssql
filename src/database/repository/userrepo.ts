import {UserModel } from '../model/User';
import { InternalError } from '../../core/ApiError';


export default class UserRepo {

public findbyid(Id:string): Promise<UserModel | null>{
   return UserModel.findOne({where:{userId:Id}})
}
public static findByEmail(email: string): Promise<UserModel |null> {
    return UserModel.findOne({ where:{email: email, status: true} })
  }

public static findPublicProfileById(id: string): Promise<UserModel | null> {
    return UserModel.findOne({where:{ userId: id, status: true }});
  }

public static async create(
    user: UserModel,
    roleid: string,
  ): Promise<{ user: UserModel }> {
    const now = new Date();
    user.createdAt=now;
    user.updatedAt=now;
    const createdUser = await UserModel.create(user);
    return { user: createdUser};
  }

public static findProfileById(id: string): Promise<UserModel | null> {
    return UserModel.findOne({where:{ userId: id, status: true }})
  }
}
