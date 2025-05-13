import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsString } from 'class-validator';

export default class CursorPaginatedResponseDto<T> {
  @ApiProperty()
  @IsBoolean()
  hasNextPage: boolean;

  @ApiPropertyOptional()
  @IsString()
  nextCursor?: string;

  @ApiProperty()
  @IsArray()
  items: T[];
}
