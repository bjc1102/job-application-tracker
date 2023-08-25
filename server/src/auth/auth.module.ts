import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './utils/google.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TokenStrategy } from './utils/token.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { RefreshTokenStrategy } from './utils/refreshToken.strategy';
import { RefreshTokenEntity } from 'src/entities/refreshToken.entity';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'google' }),
    TypeOrmModule.forFeature([UserEntity, RefreshTokenEntity]),
  ],
  providers: [GoogleStrategy, AuthService, TokenStrategy, RefreshTokenStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
