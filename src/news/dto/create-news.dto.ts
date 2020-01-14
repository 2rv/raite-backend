import { MaxLength, IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class CreateNewsDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  title: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(120)
  description: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(5000)
  body: string;
}
