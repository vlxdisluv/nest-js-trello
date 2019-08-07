import { Controller, Body, Post, Get, Put, Delete, UseGuards, Param, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ColumnsService } from './columns.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateUserDto } from './dto/update-column.dto';
import { Column } from '../columns/column.entity';
import { User } from '../users/user.entity';

@Controller('columns')
export class ColumnsController {
  constructor(
    private readonly columnsService: ColumnsService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() createColumnDto: CreateColumnDto, @Request(){user}: {user: User}): Promise<Column> {
    console.log('user!!!!!!!', user);
    return await this.columnsService.createColumn(createColumnDto, user.id);
  }

  @Get()
  async findAll(): Promise<Column[]> {
    return await this.columnsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Column> {
    return await this.columnsService.findById(id);
  }

  @Put(':id')
  async updateById(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto): Promise<Column> {
    return await this.columnsService.updateById(id, updateUserDto);
  }

  @Delete(':id')
  async removeById(@Param('id') id: number): Promise<Column> {
    return await this.columnsService.removeById(id);
  }
}
