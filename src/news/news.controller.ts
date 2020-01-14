import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  ValidationPipe,
  UsePipes,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { NewsStatus } from './news-status.enum';
import { NewsFilterDto } from './dto/news-filter.dto';
import { News } from './news.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { User } from '../auth/user.entity';

@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) {}

  @Get()
  getNewsActive(): Promise<News[]> {
    const newsFilterDto: NewsFilterDto = { status: NewsStatus.ACTIVE };
    return this.newsService.getNews(newsFilterDto);
  }

  @Get('/all')
  @UseGuards(AuthGuard())
  getNewsAll(): Promise<News[]> {
    const newsFilterDto: NewsFilterDto = { status: null };
    return this.newsService.getNews(newsFilterDto);
  }

  @Get('/:id')
  getNewsByIdActive(@Param('id', ParseIntPipe) id: number): Promise<News> {
    const newsFilterDto: NewsFilterDto = { status: NewsStatus.ACTIVE };

    return this.newsService.getNewsById(id, newsFilterDto);
  }

  @Get('/:id/all')
  @UseGuards(AuthGuard())
  getNewsById(@Param('id', ParseIntPipe) id: number): Promise<News> {
    const newsFilterDto: NewsFilterDto = { status: null };

    return this.newsService.getNewsById(id, newsFilterDto);
  }

  @Post()
  @UseGuards(AuthGuard())
  createNews(
    @Body(ValidationPipe) createNewsDto: CreateNewsDto,
  ): Promise<News> {
    return this.newsService.createNews(createNewsDto);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  deleteTaskById(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.newsService.deleteNewsById(id);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard())
  updateTaskData(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateNewsDto: UpdateNewsDto,
  ): Promise<News> {
    return this.newsService.updateNewsData(id, updateNewsDto);
  }
}
