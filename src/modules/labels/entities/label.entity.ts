import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CardLabel } from '../../card_labels/entities/card_label.entity';

@Entity('labels')
export class Label {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: 'blue' })
  color: string;

  @OneToMany(() => CardLabel, (cl) => cl.label)
  cards: CardLabel[];
}
