import { Controller, Get, UseGuards, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from './user.decorator';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

@Controller('/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Get('/google/login')
  @UseGuards(AuthGuard('google'))
  GoogleOAuthLogin() {
    return { message: 'Google Authentication' };
  }

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async GoogleOAuthRedirect(@User() user, @Res() res: Response) {
    res.redirect(this.configService.get('DOMAIN'));
  }
}
