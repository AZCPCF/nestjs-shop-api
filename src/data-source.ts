import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

const { NODE_ENV } = process.env;
dotenv.config({ path: `.env.${NODE_ENV}` });

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,

  entities:
    NODE_ENV === 'production'
      ? ['dist/entities/**/*.js']
      : ['src/entities/**/*.ts'],

  migrations:
    NODE_ENV === 'production'
      ? ['dist/migrations/**/*.js']
      : ['src/migrations/**/*.ts'],

  synchronize: NODE_ENV !== 'production',
  migrationsRun: true,
  logging: ['error'],
});
