import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { HistoryStatusEntity } from './history.entity';
import { FileEntity } from './file.entity';

@Entity({ name: 'application' })
export class ApplicationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'title' })
  title: string;

  @Column()
  link: string;

  @Column()
  platform: string;

  @OneToMany(() => FileEntity, (file) => file.application)
  files: FileEntity[];

  @OneToMany(() => HistoryStatusEntity, (history) => history.application)
  histories: HistoryStatusEntity[];

  @ManyToOne(() => UserEntity, (user) => user.applications, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: UserEntity;
}
