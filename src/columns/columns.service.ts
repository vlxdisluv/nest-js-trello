import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { CreateColumnDto } from './dto/create-column.dto';
// import { UpdateUserDto } from './dto/update-column.dto';
import { Column } from './column.entity';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { CreateCardDto } from '../cards/dto';
import { Card } from '../cards/card.entity';
import { CardsService } from '../cards/cards.service';
import { CreateColumnDto, UpdateColumnDto } from './dto';

@Injectable()
export class ColumnsService {
  constructor(
    @InjectRepository(Column)
    private readonly columnRepository: Repository<Column>,
    private readonly usersService: UsersService,
    private readonly cardsService: CardsService,
  ) {}

  async createColumn(createColumnDto: CreateColumnDto, userId: number): Promise<Column> {
    const user: User = await this.usersService.findById(userId);
    const newColumn: Column = await this.columnRepository.save(createColumnDto);
    newColumn.user = user;
    return this.columnRepository.save(newColumn);
  }

  async findAll(userId: number): Promise<Column[]> {
    return this.columnRepository.find({ where: { user: userId }});
  }

  async findById(id: number, userId: number): Promise<Column> {
    return this.columnRepository.findOne({ where: { user: userId, id }});
  }

  async updateById(id: number, updateColumnDto: UpdateColumnDto, userId: number): Promise<Column> {
    const column: Column = await this.findById(id, userId);
    return this.columnRepository.save({...column, ...updateColumnDto});
  }

  async removeById(id: number, userId: number): Promise<Column> {
    const column: Column = await this.findById(id, userId);
    return this.columnRepository.remove(column);
  }

  async createColumnCard(createCardDto: CreateCardDto, id: number, userId: number): Promise<Card> {
    const newCard: Card = await this.cardsService.createCard(createCardDto);
    const column: Column = await this.findById(id, userId);
    newCard.column = column;
    return this.cardsService.createCard(newCard);
  }

  // async findAllCards(id: number, userId: number): Promise<Card[]> {
  //   return this.cardsService.findAll({ where: { column: id, user: userId }});
  // }
}
