import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateUserDto } from './dto/update-column.dto';
import { Column } from './column.entity';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { CreateCardDto } from '../cards/dto';
import { Card } from '../cards/card.entity';
import { CardsService } from '../cards/cards.service';

@Injectable()
export class ColumnsService {
  constructor(
    @InjectRepository(Column)
    private readonly columnRepository: Repository<Column>,
    private readonly usersServices: UsersService,
    private readonly cardsServices: CardsService,
  ) {}

  async createColumn(createColumnDto: CreateColumnDto, userId: number): Promise<Column> {
    const user: User = await this.usersServices.findById(userId);
    const newColumn: Column = await this.columnRepository.save(createColumnDto);
    newColumn.user = user;
    return this.columnRepository.save(newColumn);
  }

  async findAll(): Promise<Column[]> {
    return this.columnRepository.find();
  }

  async findById(id: number): Promise<Column> {
    return this.columnRepository.findOne({ id });
  }

  async updateById(id: number, updateUserDto: UpdateUserDto): Promise<Column> {
    const column: Column = await this.findById(id);
    return this.columnRepository.save({...column, ...updateUserDto});
  }

  async removeById(id: number): Promise<Column> {
    const column: Column = await this.findById(id);
    return this.columnRepository.remove(column);
  }

  async createColumnCard(createCardDto: CreateCardDto, columnId: number): Promise<Card> {
    const newCard: Card = await this.cardsServices.createCard(createCardDto);
    const column: Column = await this.findById(columnId);
    newCard.column = column;
    return this.cardsServices.createCard(newCard);
  }
}
