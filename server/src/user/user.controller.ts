import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { User } from 'src/auth/utils/user.decorator';
import { JwtPayload } from 'src/auth/types/token.interface';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('test')
  @UseGuards(AuthGuard('refresh'))
  getUserData(@User() payload: JwtPayload) {
    console.log(payload);
  }
}
