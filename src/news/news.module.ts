import { Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsRepository } from './news.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([NewsRepository]), AuthModule],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
