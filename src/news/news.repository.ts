import { EntityRepository, Repository } from 'typeorm';
import { News } from './news.entity';
import { CreateNewsDto } from './dto/create-news.dto';
import { NewsStatus } from './news-status.enum';
import { NewsFilterDto } from './dto/news-filter.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { NEWS_ERROR } from './errors.enum';
import { NotFoundException } from '@nestjs/common';

@EntityRepository(News)
export class NewsRepository extends Repository<News> {
  async createTask(createTaskDto: CreateNewsDto): Promise<News> {
    const { title, description, body } = createTaskDto;

    const news = new News();

    news.title = title;
    news.description = description;
    news.body = body;
    news.status = NewsStatus.DISABLED;
    news.createDatetime = new Date().toISOString();

    await news.save();

    return news;
  }

  async getNews(newsFilterDto: NewsFilterDto): Promise<News[]> {
    const { status } = newsFilterDto;

    const query = await this.createQueryBuilder('news');

    if (status) {
      query.andWhere('news.status = :status', { status });
    }

    await query.select([
      'news.id',
      'news.title',
      'news.description',
      'news.createDatetime',
    ]);

    const news = await query.getMany();
    return news;
  }

  async getNewsById(
    id: number,
    newsFilterDto: NewsFilterDto,
  ): Promise<News | undefined> {
    const { status } = newsFilterDto;

    const query = await this.createQueryBuilder('news');

    query.andWhere('news.id = :id', { id });

    if (status) {
      query.andWhere('news.status = :status', { status });
    }

    await query.select([
      'news.id',
      'news.title',
      'news.description',
      'news.createDatetime',
      'news.body',
      'news.status',
    ]);

    const news = await query.getOne();
    return news;
  }

  async updateNews(id: number, updateNews: UpdateNewsDto): Promise<News> {
    const news = await this.findOne({ where: { id } });

    if (news === undefined) {
      throw new NotFoundException(NEWS_ERROR.NEWS_TO_UPDATE_NOT_FOUND);
    } else {
      await Object.keys(updateNews).forEach(key => {
        news[key] = updateNews[key];
      });
      news.createDatetime = new Date().toISOString();

      await news.save();

      return news;
    }
  }
}
