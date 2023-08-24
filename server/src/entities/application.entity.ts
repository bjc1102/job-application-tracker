import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { HistoryEntity } from './history.entity';

@Entity({ name: 'Application' })
export class ApplicationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'title' })
  title: string;

  @Column()
  link: string;

  @Column({ name: 'start_date', type: 'date' })
  start_date: Date;

  @Column({ name: 'end_date', type: 'date', nullable: true, default: null })
  end_date: Date | null;

  @OneToMany(() => HistoryEntity, (history) => history.application)
  histories: HistoryEntity[];

  @ManyToOne(() => UserEntity, (user) => user.applications, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: UserEntity;
}
