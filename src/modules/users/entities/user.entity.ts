import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Board } from '../../board/entities/board.entity';
import { BoardMember } from '../../board_member/entities/board_member.entity';
import { CardMember } from '../../card_members/entities/card_member.entity';
import { Comment } from '../../comments/entities/comment.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  image: string;

  @Column({ default: 'member' })
  role: string;

  @Column({ default: 'LOCAL' })
  account_type: string;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Board, (board) => board.owner)
  boards: Board[];

  @OneToMany(() => BoardMember, (bm) => bm.user)
  boardMembers: BoardMember[];

  @OneToMany(() => CardMember, (cm) => cm.user)
  cardMembers: CardMember[];

  @OneToMany(() => Comment, (c) => c.user)
  comments: Comment[];
}
