import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';
@Entity('users')
export class User {
  @PrimaryColumn()
  id: number;
  @Column({ unique: true })
  username: string;
  @Column({ unique: true })
  email: string;
  @Column()
  password: string;
  @CreateDateColumn({ name: 'create_at' })
  created_at: Date;
}
