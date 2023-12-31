import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ApplicationModule } from './application/application.module';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'development' ? './.env.dev' : './.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        retryAttempts: 10,
        type: 'mysql',
        host: 'localhost',
        port: configService.get('MYSQL_PORT'),
        database: 'job_application_tracker',
        username: configService.get('MYSQL_USERNAME'),
        password: configService.get('MYSQL_PASSWORD'),
        entities: [path.join(__dirname, '/entities/**/*.entity.{js, ts}')],
        synchronize: false,
        logging: true,
        timezone: 'local',
      }),
    }),
    AuthModule,
    UserModule,
    ApplicationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
