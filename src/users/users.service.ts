import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return await this.usersRepository.save(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findById(id: number): Promise<User> {
    return await this.usersRepository.findOne({ id });
  }

  async findByName(username: string): Promise<User> {
    return await this.usersRepository.findOne({ username });
  }

  async updateById(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user: User = await this.findById(id);
    return await this.usersRepository.save({...user, ...updateUserDto});
  }

  async removeById(id: number): Promise<User> {
    const user: User = await this.findById(id);
    return await this.usersRepository.remove(user);
  }
}
