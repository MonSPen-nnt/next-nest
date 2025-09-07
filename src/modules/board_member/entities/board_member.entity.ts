// src/modules/board-member/entities/board-member.entity.ts
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Board } from '../../board/entities/board.entity';
import { User } from '../../users/entities/user.entity';

@Entity('board_members')
export class BoardMember {
  @PrimaryColumn({ name: 'board_id', type: 'int' })
  board_id: number;

  @PrimaryColumn({ name: 'user_id', type: 'int' })
  user_id: number;

  @Column({ length: 50, default: 'member' })
  role: string;

  @ManyToOne(() => Board, (board) => board.members, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'board_id' })
  board: Board;

  @ManyToOne(() => User, (user) => user.boardMembers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
