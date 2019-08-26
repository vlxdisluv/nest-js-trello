import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CreateCommentDto, UpdateCommentDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';
import { CardsService } from 'src/cards/cards.service';
import { Card } from 'src/cards/card.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly usersService: UsersService,
    private readonly cardsService: CardsService,
  ) {}

  async createComment(createCommentDto: CreateCommentDto, userId: number): Promise<Comment> {
    const { cardId, ...commentData } = createCommentDto;
    const comment: Comment = await this.commentRepository.save(commentData);

    const user: User = await this.usersService.findById(userId);
    const card: Card = await this.cardsService.findById(cardId, userId);

    comment.user = user;
    comment.card = card;

    return this.commentRepository.save(comment);
  }

  async findAll(): Promise<Comment[]> {
    return this.commentRepository.find();
  }

  async findById(id: number): Promise<Comment> {
    return this.commentRepository.findOne({ id });
  }

  async updateById(id: number, updateCommentDto: UpdateCommentDto): Promise<Comment> {
    const comment: Comment = await this.findById(id);
    const updatedComment = { ...comment, ...updateCommentDto };
    return this.commentRepository.save(updatedComment);
  }

  async removeById(id: number): Promise<Comment> {
    const comment: Comment = await this.findById(id);
    return this.commentRepository.remove(comment);
  }
}
