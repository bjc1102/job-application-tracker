import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApplicationEntity } from './application.entity';

@Entity({ name: 'file' })
export class FileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'file_info' })
  file_info: string;

  @ManyToOne(() => ApplicationEntity, (application) => application.files)
  application: ApplicationEntity;
}
