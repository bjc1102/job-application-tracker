import { Injectable } from '@nestjs/common';
import ogs from 'open-graph-scraper';
import { applicationDataDTO } from 'src/auth/types/searchJobPosting.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { ApplicationEntity } from 'src/entities/application.entity';
import { HistoryStatusEntity } from 'src/entities/history.entity';
import { JwtPayload } from 'src/auth/types/token.interface';
import dayjs from 'dayjs';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ApplicationEntity)
    private readonly applicationRepository: Repository<ApplicationEntity>,
    @InjectRepository(HistoryStatusEntity)
    private readonly historyStatusRepository: Repository<HistoryStatusEntity>,
    private readonly dataSource: DataSource,
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
    user: Partial<JwtPayload>,
    applicationData: applicationDataDTO,
  ) {
    const queryRunner = this.dataSource.createQueryRunner();

    //트랜잭션 시작
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const application = this.applicationRepository.create({
        title: applicationData.title,
        link: applicationData.link,
        platform: applicationData.platform,
        user: {
          id: user.sub,
        },
      });

      const savedApplication = await this.applicationRepository.save(
        application,
      );

      // history 저장
      const historiesStatus = applicationData.status.map((status) => {
        const date = dayjs(status.date);
        const historyStatus = this.historyStatusRepository.create({
          status: status.status,
          status_create_date: date.format('YYYY-MM-DD'),
          application: { id: savedApplication.id },
        });

        return historyStatus;
      });

      await this.historyStatusRepository.save(historiesStatus);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async getApplicationData(user: Partial<JwtPayload>) {
    const userApplications = await this.applicationRepository.find({
      where: { user: { id: user.sub } },
      relations: ['histories'],
      order: {
        histories: {
          status_create_date: 'DESC',
        },
      },
    });

    return userApplications;
  }

  async deleteApplicationData(user: Partial<JwtPayload>, id: number) {
    const queryRunner = this.dataSource.createQueryRunner();

    // 트랜잭션 시작
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 지원서찾기
      const applicationToDelete = await this.applicationRepository.findOne({
        where: { id, user: { id: user.sub } },
      });

      if (!applicationToDelete) throw new Error('지원서 정보가 없습니다.');

      // 지원서 삭제
      await this.applicationRepository.remove(applicationToDelete);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
