import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 20 })
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column({
    name: 'role',
    type: 'bigint',
    default: '0',
  })
  role: number;

  async hashPassword(): Promise<void> {
    this.salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, this.salt);
  }

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
