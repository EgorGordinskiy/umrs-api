import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Max, Min } from 'class-validator';
import { MAX_LIMIT, MIN_LIMIT } from './constants';

export default class OffsetPaginated {
  constructor(partial: Partial<OffsetPaginated>) {
    Object.assign(this, partial);
    this.limit = this.size;
    this.offset = (this.page - 1) * this.size;
  }

  @ApiProperty()
  @IsNumber()
  @Min(1)
  page: number;

  @ApiProperty()
  @IsNumber()
  @Min(MIN_LIMIT)
  @Max(MAX_LIMIT)
  limit: number;

  @ApiProperty()
  @IsNumber()
  @Min(MIN_LIMIT)
  @Max(MAX_LIMIT)
  size: number;

  @ApiProperty()
  @IsNumber()
  offset: number;
}
