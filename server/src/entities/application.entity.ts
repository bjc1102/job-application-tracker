import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { UserEntitiy } from './user.entity';
import { History } from './history.entity';

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

  @OneToMany(() => History, (history) => history.application)
  histories: History[];

  @ManyToOne(() => UserEntitiy, (user) => user.applications, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: UserEntitiy;
}
