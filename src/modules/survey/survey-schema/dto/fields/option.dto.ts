import { Option } from '../../fields';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class OptionDto implements Option {
  @ApiProperty({
    type: String,
    description: 'Значение',
    example: 'age',
  })
  @IsString()
  value: string;

  @ApiProperty({
    type: String,
    description: 'Отображаемый текст',
    example: 'Возраст',
  })
  @IsString()
  label: string;
}
