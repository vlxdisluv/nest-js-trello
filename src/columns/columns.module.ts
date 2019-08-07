import { Module } from '@nestjs/common';
import { ColumnsController } from './columns.controller';
import { ColumnsService } from './columns.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Column } from './column.entity';
import { UsersModule } from '../users/users.module';
import { CardsModule } from '../cards/cards.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Column]),
    UsersModule,
    CardsModule,
  ],
  controllers: [ColumnsController],
  providers: [ColumnsService],
})
export class ColumnsModule {}
