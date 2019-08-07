import { Controller, Body, Post, Get, Put, Delete, UseGuards, Param, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ColumnsService } from './columns.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateUserDto } from './dto/update-column.dto';
import { Column } from '../columns/column.entity';
import { User } from '../users/user.entity';
import { CreateCardDto } from '../cards/dto';
import { Card } from '../cards/card.entity';

@Controller('columns')
export class ColumnsController {
  constructor(
    private readonly columnsService: ColumnsService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() createColumnDto: CreateColumnDto, @Request(){user}: {user: User}): Promise<Column> {
    return this.columnsService.createColumn(createColumnDto, user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':columnId/cards')
  async createColumnCard(@Body() createCardDto: CreateCardDto, @Param('columnId') columnId: number): Promise<Card> {
    return this.columnsService.createColumnCard(createCardDto, columnId);
  }

  @Get()
  async findAll(): Promise<Column[]> {
    return this.columnsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Column> {
    return this.columnsService.findById(id);
  }

  @Put(':id')
  async updateById(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto): Promise<Column> {
    return this.columnsService.updateById(id, updateUserDto);
  }

  @Delete(':id')
  async removeById(@Param('id') id: number): Promise<Column> {
    return this.columnsService.removeById(id);
  }
}
