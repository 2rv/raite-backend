import {
  Injectable,
  NotFoundException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { NewsFilterDto } from './dto/news-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { NewsRepository } from './news.repository';
import { NEWS_ERROR } from './errors.enum';
import { NewsStatus } from './news-status.enum';
import { News } from './news.entity';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(NewsRepository)
    private newsRepository: NewsRepository,
  ) {}

  async getNews(newsFilterDto: NewsFilterDto): Promise<News[]> {
    const tasks = await this.newsRepository.getNews(newsFilterDto);

    if (tasks.length === 0) {
      throw new NotFoundException(NEWS_ERROR.NEWS_NOT_FOUND);
    }

    return tasks;
  }

  async getNewsById(id: number, newsFilterDto: NewsFilterDto): Promise<News> {
    const found = await this.newsRepository.getNewsById(id, newsFilterDto);

    if (!found) {
      throw new NotFoundException(NEWS_ERROR.NEWS_WITH_ID_NOT_FOUND);
    } else {
      return found;
    }
  }

  async createNews(createNewsDto: CreateNewsDto): Promise<News> {
    return this.newsRepository.createTask(createNewsDto);
  }

  async deleteNewsById(id: number): Promise<void> {
    const result = await this.newsRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(NEWS_ERROR.NEWS_WITH_ID_NOT_FOUND);
    }
  }

  updateNewsData(id: number, updateNewsDto: UpdateNewsDto): Promise<News> {
    return this.newsRepository.updateNews(id, updateNewsDto);
  }
}
