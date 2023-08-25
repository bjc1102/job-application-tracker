import { Controller, Get, UseGuards, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from './utils/user.decorator';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

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
    const sevenDaysInSeconds = 7 * 24 * 60 * 60;

    res.cookie('authToken', token, { httpOnly: true });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      expires: new Date(Date.now() + sevenDaysInSeconds * 1000),
    });

    res.redirect(this.configService.get('DOMAIN'));
  }
}
