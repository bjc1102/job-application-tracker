import { Module } from '@nestjs/common';
import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { HistoryStatusEntity } from 'src/entities/history.entity';
import { ApplicationEntity } from 'src/entities/application.entity';
import { FileEntity } from 'src/entities/file.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      HistoryStatusEntity,
      ApplicationEntity,
      FileEntity,
    ]),
  ],
  providers: [ApplicationService],
  controllers: [ApplicationController],
})
export class ApplicationModule {}
