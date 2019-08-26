import { Module } from '@nestjs/common';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { Card } from './card.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColumnsModule } from 'src/columns/columns.module';

@Module({
  imports: [
    ColumnsModule,
    TypeOrmModule.forFeature([Card]),
  ],
  controllers: [CardsController],
  providers: [CardsService],
  exports: [CardsService],
})
export class CardsModule {}
