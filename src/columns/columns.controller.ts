import { Controller, Body, Post, Get, Put, Delete, UseGuards, Param, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ColumnsService } from './columns.service';
import { CreateColumnDto, UpdateColumnDto } from './dto';
import { Column } from '../columns/column.entity';
// import { User } from '../users/user.entity';
import { CreateCardDto } from '../cards/dto';
import { Card } from '../cards/card.entity';

@UseGuards(AuthGuard('jwt'))
@Controller('columns')
export class ColumnsController {
  constructor(
    private readonly columnsService: ColumnsService,
  ) {}

  @Post()
  async create(
    @Request() { user: { id: userId } }: { user: { id: number }},
    @Body() createColumnDto: CreateColumnDto,
  ): Promise<Column> {
    return this.columnsService.createColumn(createColumnDto, userId);
  }

  @Get()
  async findAll(
    @Request() { user: { id: userId } }: { user: { id: number }},
  ): Promise<Column[]> {
    return this.columnsService.findAll(userId);
  }

  @Get(':id')
  async findById(
    @Request() { user: { id: userId } }: { user: { id: number }},
    @Param('id') columnId: number,
  ): Promise<Column> {
    return this.columnsService.findById(columnId, userId);
  }

  @Put(':id')
  async updateById(
    @Request() { user: { id: userId } }: { user: { id: number }},
    @Param('id') columnId: number,
    @Body() updateUserDto: UpdateColumnDto,
  ): Promise<Column> {
    return this.columnsService.updateById(columnId, updateUserDto, userId);
  }

  @Delete(':id')
  async removeById(
    @Request() { user: { id: userId } }: { user: { id: number }},
    @Param('id') columnId: number,
  ): Promise<Column> {
    return this.columnsService.removeById(columnId, userId);
  }

  @Post(':columnId/cards')
  async createColumnCard(
    @Request() { user: { id: userId } }: { user: { id: number }},
    @Body() createCardDto: CreateCardDto,
    @Param('columnId') columnId: number,
  ): Promise<Card> {
    return this.columnsService.createColumnCard(createCardDto, columnId, userId);
  }

  // @Get(':columnId/cards')
  // async findAllCards(
  //   @Request() { user: { id: userId } }: { user: { id: number }},
  //   @Param('columnId') columnId: number,
  // ) {
  //   return this.columnsService.findAllCards(columnId, userId);
  // }
}
