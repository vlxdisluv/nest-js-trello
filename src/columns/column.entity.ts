import { ManyToOne, RelationId, Entity, Column as ORMColum, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';
import { Card } from '../cards/card.entity';

@Entity()
export class Column {
  @PrimaryGeneratedColumn()
  id: number;

  @ORMColum()
  title: string;

  @ManyToOne(type => User, user => user.columns)
  user: User;

  @RelationId((column: Column) => column.user)
  userId: number;

  @OneToMany(type => Card, card => card.column)
  cards: Card[];

  @RelationId((column: Column) => column.cards)
  cardsIds: number[];
}
