import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CreateCommentDto, UpdateCommentDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async createComment(createCommentDto: CreateCommentDto): Promise<Comment> {
    return this.commentRepository.save(createCommentDto);
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
