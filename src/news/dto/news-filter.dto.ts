import {
  IsOptional,
  IsIn,
  MaxLength,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { NewsStatus } from '../news-status.enum';

export class NewsFilterDto {
  @IsOptional()
  @IsIn(Object.values(NewsStatus))
  status: NewsStatus;
}
