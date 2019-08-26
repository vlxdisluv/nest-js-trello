import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCardDto, UpdateCardDto } from './dto';
import { Card } from './card.entity';
import { ColumnsService } from 'src/columns/columns.service';
import { Column } from 'src/columns/column.entity';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
    private readonly columnsService: ColumnsService,
  ) {}

  async createCard(createCardDto: CreateCardDto, userId: number): Promise<Card> {
    const { columnId, ...cardData } = createCardDto;
    const card = await this.cardRepository.save(cardData);
    const column = await this.columnsService.findById(columnId, userId);
    card.column = column;
    return this.cardRepository.save(card);
  }

  async findAll(userId: number): Promise<Card[]> {
    return this.cardRepository.find({ where: { user: userId }});
  }

  async findById(id: number, userId: number): Promise<Card> {
    return this.cardRepository.findOne({ where: { user: userId, id }});
  }

  async updateById(id: number, updateCardDto: UpdateCardDto, userId: number): Promise<Card> {
    const { columnId, ...cardData } = updateCardDto;

    const card: Card = await this.findById(id, userId);
    const column: Column = await this.columnsService.findById(columnId, userId);

    const updatedCard = { ...card, ...cardData };
    updatedCard.column = column;
    return this.cardRepository.save(updatedCard);
  }

  async removeById(id: number, userId: number): Promise<Card> {
    const card: Card = await this.findById(id, userId);
    return this.cardRepository.remove(card);
  }
}
