import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { MAX_LIMIT, MIN_LIMIT } from './constants';

export default class CursorPaginatedRequestDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  cursor?: string; // "timestamp_id"

  @ApiProperty()
  @IsNumber()
  @Min(MIN_LIMIT)
  @Max(MAX_LIMIT)
  limit: number;
}
