import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { BoardMember } from '../../board_member/entities/board_member.entity';
import { List } from '../../lists/entities/list.entity';

@Entity('boards')
export class Board {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => User, (user) => user.boards, { onDelete: 'SET NULL' })
  owner: User;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => BoardMember, (bm) => bm.board)
  members: BoardMember[];

  @OneToMany(() => List, (list) => list.board)
  lists: List[];
}
