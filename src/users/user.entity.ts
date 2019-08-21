import { Unique, RelationId, OneToMany, Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Column as EntityColumn } from '../columns/column.entity';

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

  @RelationId((user: User) => user.columns)
  columnsIds: number[];
}
