import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, RelationId } from 'typeorm';
import { Column as EntityColumn } from '../columns/column.entity';

@Entity()
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(type => EntityColumn, column => column.cards)
  column: EntityColumn;

  @RelationId((card: Card) => card.column)
  columnId: number;
}
