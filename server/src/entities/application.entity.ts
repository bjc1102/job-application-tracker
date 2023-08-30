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

@Entity({ name: 'application' })
export class ApplicationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'title' })
  title: string;

  @Column()
  link: string;

  @OneToMany(() => HistoryStatusEntity, (history) => history.application)
  histories: HistoryStatusEntity[];

  @ManyToOne(() => UserEntity, (user) => user.applications, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: UserEntity;
}
