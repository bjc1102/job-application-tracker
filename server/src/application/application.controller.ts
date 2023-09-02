import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtPayload } from 'src/auth/types/token.interface';
import { User } from 'src/auth/utils/user.decorator';
import { ApplicationService } from './application.service';
import {
  applicationDataDTO,
  searchJobPostingDTO,
} from 'src/auth/types/searchJobPosting.interface';

@Controller('/application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}
  @Post('/save')
  @UseGuards(AuthGuard('jwt'))
  async saveApplicationData(
    @User() payload: JwtPayload,
    @Body() applicationData: applicationDataDTO,
  ) {
    const result = await this.applicationService.saveUserApplicationData(
      { sub: payload.sub, email: payload.email },
      applicationData,
    );
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

  @Get('/user/applicationList')
  @UseGuards(AuthGuard('jwt'))
  async getUserApplicationData(@User() payload: JwtPayload) {
    const result = await this.applicationService.getApplicationData({
      sub: payload.sub,
    });

    return result;
  }
}
