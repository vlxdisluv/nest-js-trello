import {
  Entity,
  Column as OriginalColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  RelationId,
} from 'typeorm';
import { Column } from '../columns/column.entity';

@Entity()
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @OriginalColumn({ length: 100 })
  title: string;

  @OriginalColumn()
  description: string;

  @ManyToOne(type => Column, column => column.cards)
  column: Column;

  @RelationId((card: Card) => card.column)
  columnId: number;
}
