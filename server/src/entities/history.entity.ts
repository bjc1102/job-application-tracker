import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Application } from './application.entity';

@Entity({ name: 'History' })
export class History {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

  @Column({ name: 'status_create_date', type: 'date' })
  status_create_date: Date;

  @ManyToOne(() => Application, (application) => application.histories)
  @JoinColumn({ name: 'application_id', referencedColumnName: 'id' })
  application: Application;
}
