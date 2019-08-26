import { Controller, Post, Body, Request, Get, Put, Delete, Param, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto, UpdateCommentDto } from './dto';
import { Comment } from './comment.entity';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('comments')
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
  ) {}

  @Post()
  async create(
    @Request() { user: { id: userId }}: { user: { id: number }},
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    return this.commentsService.createComment(createCommentDto, userId);
  }

  @Get()
  async findAll(): Promise<Comment[]> {
    return this.commentsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Comment> {
    return this.commentsService.findById(id);
  }

  @Put(':id')
  async updateById(@Param('id') id: number, @Body() updateCommentDto: UpdateCommentDto): Promise<Comment> {
    return this.commentsService.updateById(id, updateCommentDto);
  }

  @Delete(':id')
  async removeById(@Param('id') id: number): Promise<Comment> {
    return this.commentsService.removeById(id);
  }
}
