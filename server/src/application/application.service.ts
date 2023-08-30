import { Injectable } from '@nestjs/common';
import ogs from 'open-graph-scraper';
import { applicationDataDTO } from 'src/auth/types/searchJobPosting.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { ApplicationEntity } from 'src/entities/application.entity';
import { HistoryStatusEntity } from 'src/entities/history.entity';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ApplicationEntity)
    private readonly applicationRepository: Repository<ApplicationEntity>,
    @InjectRepository(HistoryStatusEntity)
    private readonly historyStatusApplication: Repository<HistoryStatusEntity>,
  ) {}
  async getJobPostingOpenGraphData(url: string) {
    const options = { url };

    try {
      const data = await ogs(options);

      return data.result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async saveUserApplicationData(
    user: { sub: string; email: string },
    applicationData: applicationDataDTO,
  ) {
    this.applicationRepository.create({
      title: applicationData.title,
      link: applicationData.link,
    });
  }
}
