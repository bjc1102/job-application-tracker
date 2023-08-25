import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload } from '../types/token.interface';
import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

const cookieExtractor = function (request) {
  const cookies = request.headers.cookie;
  if (!cookies) return null;

  const cookieArray = cookies.split('; ');

  for (const cookie of cookieArray) {
    if (cookie.startsWith('authToken=')) {
      const authToken = cookie.substring('authToken='.length);
      return authToken;
    }
  }

  return null;
};

@Injectable()
export class TokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: cookieExtractor,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload) {
    return payload;
  }
}
