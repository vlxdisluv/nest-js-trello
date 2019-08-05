import { Controller, Post, Param, Body, Get, Put, Delete } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
// import { UserService } from './users.service';

@Controller('users')
export class UsersController {
  // constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<string> {
    return 'Created new user';
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<string> {
    return 'Get some user by id';
  }

  @Put(':id')
  async updateById(@Param('id') id: string, @Body() updateUserDto: CreateUserDto): Promise<string> {
    return 'Update user by id';
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string): Promise<string> {
    return 'Remove user by id';
  }
}
