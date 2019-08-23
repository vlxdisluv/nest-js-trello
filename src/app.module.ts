import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ColumnsModule } from './columns/columns.module';
import { AuthModule } from './auth/auth.module';
import { CardsModule } from './cards/cards.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    CommentsModule,
    UsersModule,
    ColumnsModule,
    CardsModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: 5432,
      username: 'purrweb',
      password: 'purrweb',
      database: 'nest',
      synchronize: true,
      logging: true,
      host: 'localhost',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
