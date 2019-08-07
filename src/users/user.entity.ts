import {
  Entity,
  Column as OriginalColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  RelationId,
  Unique,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import { Column } from '../columns/column.entity';

@Entity()
@Unique(['username', 'email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @OriginalColumn({ length: 500 })
  username: string;

  @OriginalColumn({ length: 500, default: null })
  email?: string;

  @Exclude()
  @OriginalColumn('text')
  password: string;

  @OneToMany(type => Column, column => column.user)
  columns: Column[];

  @RelationId((user: User) => user.columns)
  columnsIds: number[];
}
