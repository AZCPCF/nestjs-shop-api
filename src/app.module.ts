import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './common/config/database.config';

const { NODE_ENV } = process.env;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${NODE_ENV}`,
      load: [databaseConfig],
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
  ],
})
export class AppModule {}
