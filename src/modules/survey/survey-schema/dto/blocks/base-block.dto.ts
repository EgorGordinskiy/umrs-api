import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import {
  BaseBlock,
  DYNAMIC_LIST_TYPE_VALUE,
  DynamicListBlockType,
  SECTION_TYPE_VALUE,
  SectionBlockType,
} from '../../blocks';

export class BaseBlockDto implements BaseBlock {
  @ApiProperty({
    type: String,
    example: '92180d89-3dde-4ee2-b857-8a71213df5c1',
  })
  @IsString()
  readonly id: string;

  @ApiProperty({
    type: String,
    enum: [SECTION_TYPE_VALUE, DYNAMIC_LIST_TYPE_VALUE],
    default: SECTION_TYPE_VALUE,
  })
  @IsString()
  readonly type: DynamicListBlockType | SectionBlockType;

  @ApiProperty({
    description: 'Название блока',
    type: String,
    example: 'Параметры утреннего передвижения',
  })
  @IsString()
  readonly title: string;

  @ApiProperty({
    description: 'Описание блока',
    type: String,
    example: 'Детали передвижения в утреннем состоянии',
  })
  @IsString()
  readonly description?: string;
}
