import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Card } from '../../cards/entities/card.entity';
import { Label } from '../../labels/entities/label.entity';

@Entity('card_labels')
export class CardLabel {
  @PrimaryColumn()
  card_id: number;

  @PrimaryColumn()
  label_id: number;

  @ManyToOne(() => Card, (card) => card.labels, { onDelete: 'CASCADE' })
  card: Card;

  @ManyToOne(() => Label, (label) => label.cards, { onDelete: 'CASCADE' })
  label: Label;
}
