import { IsNumber, Max, Min } from 'class-validator';
import { MAX_LIMIT, MIN_LIMIT } from './constants';

export class OffsetPaginated {
  constructor(options: Partial<OffsetPaginated>) {
    Object.assign(this, options);
  }

  @IsNumber()
  @Min(1)
  page: number = 0;

  @IsNumber()
  @Min(MIN_LIMIT)
  @Max(MAX_LIMIT)
  limit: number;

  @IsNumber()
  @Min(MIN_LIMIT)
  @Max(MAX_LIMIT)
  size: number;

  @IsNumber()
  offset: number = 0;
}
