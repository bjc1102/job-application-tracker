import { PrimaryGeneratedColumn, Entity, Column, OneToMany } from 'typeorm';
import { RefreshToken } from './refreshToken.entity';
import { Application } from './application.entity';

@Entity({ name: 'User' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  Name: string;

  @Column()
  imageUrl: string;

  @OneToMany(() => RefreshToken, (token) => token.user)
  refreshTokens: RefreshToken[];

  @OneToMany(() => Application, (application) => application.user)
  applications: Application[];
}
