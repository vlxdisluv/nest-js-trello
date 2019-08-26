import { Unique, RelationId, OneToMany, Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Column as EntityColumn } from '../columns/column.entity';
import { Comment } from '../comments/comment.entity';
import { Card } from '../cards/card.entity';

@Entity()
@Unique(['username'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(type => EntityColumn, column => column.user)
  columns: EntityColumn[];

  // @RelationId((user: User) => user.columns)
  // columnsIds: number[];
  @OneToMany(type => Card, card => card.user)
  cards: Card[];

  @OneToMany(type => Comment, comment => comment.user)
  comments: Comment;
  // @RelationId((user: User) => user.comments)
  // commentsIds: number[];
}
