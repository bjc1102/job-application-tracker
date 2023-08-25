import { Controller, Get, UseGuards, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from './utils/user.decorator';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { cookieOption, refreshTokenCookieOption } from './utils/cookie.option';
import { JwtPayload } from './types/token.interface';

@Controller('/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Get('google/login')
  @UseGuards(AuthGuard('google'))
  GoogleOAuthLogin() {
    return { message: 'Google Authentication' };
  }

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async GoogleOAuthRedirect(@User() user: GoogleUser, @Res() res: Response) {
    const { token, refreshToken } = await this.authService.registerUser(user);

    res.cookie('authToken', token, cookieOption);
    res.cookie('refreshToken', refreshToken, refreshTokenCookieOption);

    res.redirect(this.configService.get('DOMAIN'));
  }

  @Get('refresh')
  @UseGuards(AuthGuard('refresh'))
  async generateNewToken(@User() payload: JwtPayload, @Res() res: Response) {
    const token = await this.authService.refreshAccessToken(payload);

    res.cookie('authToken', token, cookieOption);

    return res.send({ message: '토큰 발급' });
  }
}
