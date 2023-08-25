import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { RefreshTokenEntity } from 'src/entities/refreshToken.entity';
import { JwtPayload } from './types/token.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(RefreshTokenEntity)
    private readonly refreshTokenRepository: Repository<RefreshTokenEntity>,
    private readonly configService: ConfigService,
  ) {}

  async registerUser(value: GoogleUser) {
    const existingUser = await this.userRepository.findOne({
      where: {
        email: value.email,
      },
    });

    if (existingUser) {
      const token = this.generateToken(existingUser);
      const refreshToken = await this.generateRefreshToken(existingUser);

      return { token, refreshToken };
    } else {
      const newUser = this.userRepository.create(value);
      await this.userRepository.save(newUser);

      const token = this.generateToken(newUser);
      const refreshToken = await this.generateRefreshToken(newUser);

      return { token, refreshToken };
    }
  }

  async refreshAccessToken(payload: JwtPayload) {
    // Find the user's refresh token based on payload
    const refreshToken = await this.refreshTokenRepository.findOne({
      where: {
        user: { id: payload.sub },
        exp: payload.exp,
        iat: payload.iat,
      },
      relations: {
        user: true,
      },
    });

    if (!refreshToken) {
      throw new Error('Refresh token not found or expired.');
    }

    const user = refreshToken.user;
    const newAccessToken = this.generateToken(user);

    return newAccessToken;
  }

  private generateToken(user: UserEntity) {
    const payload = {
      sub: user.id,
      email: user.email,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 900, // 15분 설정
    };

    const token = jwt.sign(payload, this.configService.get('JWT_SECRET'));
    return token;
  }

  private async generateRefreshToken(user: UserEntity) {
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + 14 * 24 * 60 * 60; // 14일 설정

    const refreshTokenEntity = this.refreshTokenRepository.create({
      iat,
      exp,
      user,
    });

    await this.refreshTokenRepository.save(refreshTokenEntity);

    const payload = {
      sub: user.id,
      email: user.email,
      iat,
      exp,
    };

    const token = jwt.sign(payload, this.configService.get('REFRESH_SECRET'));
    return token;
  }
}
