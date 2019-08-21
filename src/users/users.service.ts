import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.usersRepository.save(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findById(id: number): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async findByName(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ username });
  }

  async updateById(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user: User = await this.findById(id);
    const updatedUser = { ...user, ...updateUserDto };
    return this.usersRepository.save(updatedUser);
  }

  async removeById(id: number): Promise<User> {
    const user: User = await this.findById(id);
    return this.usersRepository.remove(user);
  }
}
