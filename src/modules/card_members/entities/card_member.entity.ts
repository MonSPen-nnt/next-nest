import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Card } from '../../cards/entities/card.entity';

@Entity('card_members')
export class CardMember {
  @PrimaryColumn()
  card_id: number;

  @PrimaryColumn()
  user_id: number;

  @ManyToOne(() => Card, (card) => card.members, { onDelete: 'CASCADE' })
  card: Card;

  @ManyToOne(() => User, (user) => user.cardMembers, { onDelete: 'CASCADE' })
  user: User;
}
