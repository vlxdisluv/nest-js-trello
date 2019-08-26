import { Controller, UseGuards, Request, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { CardsService } from './cards.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateCardDto, UpdateCardDto } from './dto';
import { Card } from './card.entity';

@UseGuards(AuthGuard('jwt'))
@Controller('cards')
export class CardsController {
  constructor(
    private readonly cardsService: CardsService,
  ) {}

  @Post()
  async create(
    @Request() { user: { id: userId }}: { user: { id: number }},
    @Body() createCardDto: CreateCardDto,
  ): Promise<Card> {
    return this.cardsService.createCard(createCardDto, userId);
  }

  @Get()
  async findAll(
    @Request() { user: { id: userId }}: { user: { id: number }},
  ): Promise<Card[]> {
    return this.cardsService.findAll(userId);
  }

  @Get(':id')
  async findById(
    @Request() { user: { id: userId }}: { user: { id: number }},
    @Param('id') id: number,
  ): Promise<Card> {
    return this.cardsService.findById(id, userId);
  }

  @Put(':id')
  async updateById(
    @Request() { user: { id: userId }}: { user: { id: number }},
    @Param('id') id: number,
    @Body() updateCardDto: UpdateCardDto,
  ): Promise<Card> {
    return this.cardsService.updateById(id, updateCardDto, userId);
  }

  @Delete(':id')
  async removeById(
    @Request() { user: { id: userId }}: { user: { id: number }},
    @Param('id') id: number,
  ): Promise<Card> {
    return this.cardsService.removeById(id, userId);
  }
}
