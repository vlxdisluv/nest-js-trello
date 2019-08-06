import { Controller, Request, Post, Param, Body, Get, Put, Delete, UseGuards, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { AuthService } from '../auth/auth.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }

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
