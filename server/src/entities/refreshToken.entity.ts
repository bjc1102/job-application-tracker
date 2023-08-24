import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntitiy } from './user.entity';

@Entity({ name: 'RefreshToken' })
export class RefreshTokenEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @ManyToOne(() => UserEntitiy, (user) => user.refreshTokens)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: UserEntitiy;
}
