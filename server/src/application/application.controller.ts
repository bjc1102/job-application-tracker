import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtPayload } from 'src/auth/types/token.interface';
import { User } from 'src/auth/utils/user.decorator';

@Controller('application')
export class ApplicationController {
  @Post('test')
  @UseGuards(AuthGuard('jwt'))
  async getUserData(@User() payload: JwtPayload) {
    console.log('HIHELLO');
  }
}
