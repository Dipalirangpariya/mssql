import { Sequelize } from 'sequelize';
import { db } from '../config';
import UserModel from './model/User';

export const sequelize = new Sequelize(`${db.name}`, `${db.user}`, `${db.password}`, {
  host: `${db.host}`,
  dialect: 'mssql',
});
export const dbUser = {
  User: UserModel(sequelize),
  sequelize,
  Sequelize
}

sequelize.authenticate().then(async () => {
  console.log('Connection has been established successfully.');
  await dbUser.User.sync();
}).catch((err: any) => {
  console.error('Unable to connect to the database:', err);
});

