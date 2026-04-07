import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1032001',
  database: 'marsascape',
  synchronize: true,
});
// export const AppDataSource = new DataSource({
//   type: 'postgres',
//   url: process.env.DB_URL,
//   entities: ['dist/**/*.entity.js'],
//   migrations: ['dist/database/migrations/*.js'],
//   ssl: { rejectUnauthorized: false },
//   synchronize: true,
// });
