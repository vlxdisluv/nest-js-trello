import {
  Entity,
  Column as OriginalColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  RelationId,
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Column {
  @PrimaryGeneratedColumn()
  id: number;

  @OriginalColumn({ length: 100 })
  title: string;

  @ManyToOne(type => User, user => user.columns)
  user: User;

  @RelationId((column: Column) => column.user)
  userId: number;
}
