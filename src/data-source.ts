import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from './entities/user/user.entity';
import { Category } from './entities/category/category.entity';
import { Product } from './entities/product/product.entity';

const { NODE_ENV } = process.env;
dotenv.config({ path: `.env.${NODE_ENV}` });

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,

  entities: [User, Category, Product],

  migrations:
    NODE_ENV === 'production'
      ? ['dist/migrations/**/*.js']
      : ['src/migrations/**/*.ts'],

  synchronize: false,
  migrationsRun: true,
  logging: ['error'],
});
