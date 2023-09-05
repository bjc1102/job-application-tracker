import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
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
    try {
      await this.applicationService.saveUserApplicationData(
        { sub: payload.sub, email: payload.email },
        applicationData,
      );
      return { success: true, message: '저장되었습니다.' };
    } catch (err) {
      throw new HttpException(
        {
          success: false,
          message: err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
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

  @Delete('/user/application/:id')
  @UseGuards(AuthGuard('jwt'))
  async deleteUserApplicationData(
    @Param('id') id: number,
    @User() payload: JwtPayload,
  ) {
    try {
      await this.applicationService.deleteApplicationData(
        {
          sub: payload.sub,
        },
        id,
      );

      return { success: true, message: '지원서가 삭제되었습니다.' };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: error.message,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
