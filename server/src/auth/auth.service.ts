import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly configService: ConfigService,
  ) {}

  async registerUser(value: GoogleUser) {
    const existingUser = await this.userRepository.findOne({
      where: {
        email: value.email,
      },
    });

    if (existingUser) {
      // 이미 존재하는 사용자인 경우, 토큰을 생성하여 리턴
      const token = this.generateToken(existingUser);
      const refreshToken = this.generateRefreshToken(existingUser);

      return { token, refreshToken };
    } else {
      const newUser = this.userRepository.create(value);
      await this.userRepository.save(newUser);

      const token = this.generateToken(newUser);
      const refreshToken = this.generateRefreshToken(newUser);

      return { token, refreshToken };
    }
  }

  // 사용자 토큰을 생성하는 메서드
  private generateToken(user: UserEntity) {
    const payload = { sub: user.id, email: user.email };
    const token = jwt.sign(payload, this.configService.get('JWT_SECRET'), {
      expiresIn: '900s',
    });
    return token;
  }

  private generateRefreshToken(user: UserEntity) {
    const payload = { sub: user.id, email: user.email };
    const token = jwt.sign(payload, this.configService.get('REFRESH_SECRET'), {
      expiresIn: '7d',
    });
    return token;
  }
}
