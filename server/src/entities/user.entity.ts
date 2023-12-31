import { PrimaryGeneratedColumn, Entity, Column, OneToMany } from 'typeorm';
import { RefreshTokenEntity } from './refreshToken.entity';
import { ApplicationEntity } from './application.entity';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  imageUrl: string;

  @OneToMany(() => RefreshTokenEntity, (token) => token.user, {
    onDelete: 'CASCADE',
  })
  refreshTokens: RefreshTokenEntity[];

  @OneToMany(() => ApplicationEntity, (application) => application.user, {
    onDelete: 'CASCADE',
  })
  applications: ApplicationEntity[];
}
