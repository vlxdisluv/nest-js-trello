import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCardDto, UpdateCardDto } from './dto';
import { Card } from './card.entity';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
  ) {}

  async createCard(createCardDto: CreateCardDto): Promise<Card> {
    return await this.cardRepository.save(createCardDto);
  }

  async findAll(): Promise<Card[]> {
    return await this.cardRepository.find();
  }

  async findById(id: number): Promise<Card> {
    return await this.cardRepository.findOne({ id });
  }

  async updateById(id: number, updateCardDto: UpdateCardDto): Promise<Card> {
    const card: Card = await this.findById(id);
    return await this.cardRepository.save({...card, ...updateCardDto});
  }

  async removeById(id: number): Promise<Card> {
    const card: Card = await this.findById(id);
    return await this.cardRepository.remove(card);
  }
}
