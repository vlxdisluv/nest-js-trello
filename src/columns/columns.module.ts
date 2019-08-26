import { Module } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { ColumnsController } from './columns.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Column } from './column.entity';
import { UsersModule } from '../users/users.module';
// import { CardsModule } from '../cards/cards.module';

@Module({
  imports: [
    // CardsModule,
    UsersModule,
    TypeOrmModule.forFeature([Column]),
  ],
  controllers: [ColumnsController],
  providers: [ColumnsService],
  exports: [ColumnsService],
})
export class ColumnsModule {}
