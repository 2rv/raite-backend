import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { NewsStatus } from './news-status.enum';

@Entity()
export class News extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 50 })
  title: string;

  @Column({ type: 'varchar', length: 120 })
  description: string;

  @Column({ type: 'varchar', length: 5000 })
  body: string;

  @Column({ type: 'enum', enum: NewsStatus, default: NewsStatus.DISABLED })
  status: NewsStatus;

  @Column({ type: 'datetime' })
  createDatetime: string;
}
