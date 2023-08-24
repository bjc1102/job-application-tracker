import { PrimaryGeneratedColumn, Entity, Column, OneToMany } from 'typeorm';
import { RefreshToken } from './refreshToken.entity';
import { ApplicationEntity } from './application.entity';

@Entity({ name: 'User' })
export class UserEntitiy {
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

  @OneToMany(() => ApplicationEntity, (application) => application.user)
  applications: ApplicationEntity[];
}
