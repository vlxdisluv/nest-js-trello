import { Controller, UseGuards, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { CardsService } from './cards.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateCardDto, UpdateCardDto } from './dto';
import { Card } from './card.entity';

@Controller('cards')
export class CardsController {
  constructor(
    private readonly cardsService: CardsService,
  ) {}

  @Post()
  async create(@Body() createCardDto: CreateCardDto): Promise<Card> {
    return await this.cardsService.createCard(createCardDto);
  }

  @Get()
  async findAll(): Promise<Card[]> {
    return await this.cardsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Card> {
    return await this.cardsService.findById(id);
  }

  @Put(':id')
  async updateById(@Param('id') id: number, @Body() updateCardDto: UpdateCardDto): Promise<Card> {
    return await this.cardsService.updateById(id, updateCardDto);
  }

  @Delete(':id')
  async removeById(@Param('id') id: number): Promise<Card> {
    return await this.cardsService.removeById(id);
  }
}
