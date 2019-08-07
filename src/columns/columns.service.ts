import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateUserDto } from './dto/update-column.dto';
import { Column } from './column.entity';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class ColumnsService {
  constructor(
    @InjectRepository(Column)
    private readonly columnRepository: Repository<Column>,
    private readonly usersServices: UsersService,
  ) {}

  async createColumn(createColumnDto: CreateColumnDto, userId: number): Promise<Column> {
    const user: User = await this.usersServices.findById(userId);
    const newColumn: Column = await this.columnRepository.save(createColumnDto);
    newColumn.user = user;
    return await this.columnRepository.save(newColumn);
  }

  async findAll(): Promise<Column[]> {
    return await this.columnRepository.find();
  }

  async findById(id: number): Promise<Column> {
    return await this.columnRepository.findOne({ id });
  }

  async updateById(id: number, updateUserDto: UpdateUserDto): Promise<Column> {
    const column: Column = await this.findById(id);
    return await this.columnRepository.save({...column, ...updateUserDto});
  }

  async removeById(id: number): Promise<Column> {
    const column: Column = await this.findById(id);
    return await this.columnRepository.remove(column);
  }
}
