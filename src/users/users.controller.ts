import { Controller, Post, Param, Body, Get, Put, Delete, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.createUser(createUserDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async findById(@Param('id') id: number): Promise<User> {
    return await this.usersService.findById(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  async updateById(@Param('id') id: number, @Body() data: UpdateUserDto): Promise<User> {
    return await this.usersService.updateById(id, data);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':id')
  async removeById(@Param('id') id: number): Promise<User> {
    return await this.usersService.removeById(id);
  }
}
