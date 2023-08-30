import {
  Body,
  Controller,
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
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { ApplicationEntity } from 'src/entities/application.entity';
import { HistoryStatusEntity } from 'src/entities/history.entity';

@Controller('/application')
export class ApplicationController {
  constructor(
    private readonly applicationService: ApplicationService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ApplicationEntity)
    private readonly applicationRepository: Repository<ApplicationEntity>,
    @InjectRepository(HistoryStatusEntity)
    private readonly historyStatusApplication: Repository<HistoryStatusEntity>,
  ) {}
  @Post('/save')
  @UseGuards(AuthGuard('jwt'))
  async saveApplicationData(
    @User() payload: JwtPayload,
    @Body() applicationData: applicationDataDTO,
  ) {
    console.log(applicationData);
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
