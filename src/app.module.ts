import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module.js';
import { UserModule } from './modules/user/user.module.js';
import { OrderModule } from './modules/order/order.module.js';
import { HealthModule } from './modules/health/health.module.js';
import { JwtModule } from './modules/jwt/jwt.module.js';
import { AdminModule } from './modules/admin/admin.module.js';
import databaseConfig from './common/config/database.config.js';
import jwtConfig from './common/config/jwt.config.js';
import { SharedModule } from './common/shared/shared.module.js';
import { CategoryModule } from './modules/category/category.module.js';

const { NODE_ENV } = process.env;

@Module({
  imports: [
    SharedModule,
    ConfigModule.forRoot({
      envFilePath: `.env.${NODE_ENV}`,
      load: [databaseConfig, jwtConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get<string>('database.host'),
          port: configService.get<number>('database.port'),
          username: configService.get<string>('database.username'),
          password: configService.get<string>('database.password'),
          database: configService.get<string>('database.name'),
          autoLoadEntities: true,
          synchronize: NODE_ENV !== 'production',
          migrationsRun: true,
          migrations: ['src/migrations/**/*.js'],
        };
      },
    }),
    AuthModule,
    UserModule,
    OrderModule,
    HealthModule,
    JwtModule,
    AdminModule,
    CategoryModule,
  ],
})
export class AppModule {}
