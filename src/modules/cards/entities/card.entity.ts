import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { List } from '../../lists/entities/list.entity';
import { CardMember } from '../../card_members/entities/card_member.entity';
import { Comment } from '../../comments/entities/comment.entity';
import { CardLabel } from '../../card_labels/entities/card_label.entity';

@Entity('cards')
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  position: number;

  @Column({ nullable: true, type: 'timestamp' })
  due_date: Date;

  @ManyToOne(() => List, (list) => list.cards, { onDelete: 'CASCADE' })
  list: List;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => CardMember, (cm) => cm.card)
  members: CardMember[];

  @OneToMany(() => Comment, (c) => c.card)
  comments: Comment[];

  @OneToMany(() => CardLabel, (cl) => cl.card)
  labels: CardLabel[];
}
