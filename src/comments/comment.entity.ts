import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, RelationId, CreateDateColumn, BeforeInsert, UpdateDateColumn } from 'typeorm';
import { Card } from '../cards/card.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamptz' })
  sentAt: string;

  @Column()
  message: string;

  @ManyToOne(type => Card, card => card.comments)
  card: Card;

  @RelationId((comment: Comment) => comment.card)
  cardId: number;
}
