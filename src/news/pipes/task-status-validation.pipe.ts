import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

import { NewsStatus } from '../news-status.enum';

export class NewsStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [NewsStatus.ACTIVE, NewsStatus.DISABLED];

  transform(value: any = null, metadata: ArgumentMetadata) {
    value = value.toUpperCase();

    const isValid = this.statusValidate(value);

    if (isValid) {
      return value;
    } else {
      throw new BadRequestException('NEWS_TASK_STATUS_INVALID');
    }
  }

  private statusValidate(status: any) {
    const index = this.allowedStatuses.indexOf(status);
    return index !== -1;
  }
}
