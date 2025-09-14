import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
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

  @Column({ default: false })
  is_active: boolean;

  // 👉 Thêm 2 cột xác nhận tài khoản
  @Column({ nullable: true })
  verification_code: string;

  @Column({ type: 'timestamptz', nullable: true })
  verification_expires_at: Date;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  update_at: Date;

  @OneToMany(() => Board, (board) => board.owner)
  boards: Board[];

  @OneToMany(() => BoardMember, (bm) => bm.user)
  boardMembers: BoardMember[];

  @OneToMany(() => CardMember, (cm) => cm.user)
  cardMembers: CardMember[];

  @OneToMany(() => Comment, (c) => c.user)
  comments: Comment[];
}
