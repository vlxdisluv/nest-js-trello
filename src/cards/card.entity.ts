import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, RelationId, OneToMany } from 'typeorm';
import { Column as EntityColumn } from '../columns/column.entity';
import { Comment } from '../comments/comment.entity';

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

  @OneToMany(type => Comment, comment => comment.card)
  comments: Comment[];

  @RelationId((card: Card) => card.comments)
  commentsIds: number[];
}
