import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { ApplicationEntity } from './application.entity';

@Entity({ name: 'note' })
export class NoteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'note' })
  note: string;

  @OneToOne(() => ApplicationEntity, (application) => application.note, {
    onDelete: 'CASCADE',
  })
  application: ApplicationEntity;
}
