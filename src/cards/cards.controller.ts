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
    @Body() createCardDto: CreateCardDto,
  ): Promise<Card> {
    return this.cardsService.createCard(createCardDto);
  }

  @Get()
  async findAll(): Promise<Card[]> {
    return this.cardsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Card> {
    return this.cardsService.findById(id);
  }

  @Put(':id')
  async updateById(@Param('id') id: number, @Body() updateCardDto: UpdateCardDto): Promise<Card> {
    return this.cardsService.updateById(id, updateCardDto);
  }

  @Delete(':id')
  async removeById(@Param('id') id: number): Promise<Card> {
    return this.cardsService.removeById(id);
  }
}
