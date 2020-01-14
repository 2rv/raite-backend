import {
  MaxLength,
  IsNotEmpty,
  IsIn,
  IsOptional,
  IsString,
  IsDateString,
} from 'class-validator';
import { NewsStatus } from '../news-status.enum';

export class UpdateNewsDto {
  @IsOptional()
  @MaxLength(50)
  @IsString()
  title: string;

  @IsOptional()
  @MaxLength(300)
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  @MaxLength(5000)
  body: string;

  @IsOptional()
  @IsIn(Object.values(NewsStatus))
  status: string;

  @IsOptional()
  @IsDateString()
  createDatetime: string;
}
