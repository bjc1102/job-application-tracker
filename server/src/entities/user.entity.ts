import { PrimaryGeneratedColumn, Entity, Column, OneToMany } from 'typeorm';
import { RefreshTokenEntity } from './refreshToken.entity';
import { ApplicationEntity } from './application.entity';

@Entity({ name: 'User' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  Name: string;

  @Column()
  imageUrl: string;

  @OneToMany(() => RefreshTokenEntity, (token) => token.user)
  refreshTokens: RefreshTokenEntity[];

  @OneToMany(() => ApplicationEntity, (application) => application.user)
  applications: ApplicationEntity[];
}
