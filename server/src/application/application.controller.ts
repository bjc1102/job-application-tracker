import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  NotFoundException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtPayload } from 'src/auth/types/token.interface';
import { User } from 'src/auth/utils/user.decorator';
import { ApplicationService } from './application.service';
import { searchJobPostingDTO } from 'src/auth/types/searchJobPosting.interface';

@Controller('/application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}
  @Post('test')
  @UseGuards(AuthGuard('jwt'))
  async getUserData(@User() payload: JwtPayload) {
    console.log('HIHELLO');
  }

  @Post('/jobposting')
  @UseGuards(AuthGuard('jwt'))
  async getJobPostingData(
    @User() payload: JwtPayload,
    @Body() searchJobPostingDTO: searchJobPostingDTO,
  ) {
    const { url } = searchJobPostingDTO;

    try {
      const data = await this.applicationService.getJobPostingOpenGraphData(
        url.trim(),
      );
      return data;
    } catch (error) {
      throw new HttpException(
        {
          message: '채용공고를 불러올 수 없습니다',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }
}
