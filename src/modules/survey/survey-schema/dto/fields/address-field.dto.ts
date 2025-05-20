import {
  ADDRESS_FIELD_TYPE_VALUE,
  ADDRESS_INPUT_TYPE_VALUE,
  AddressField,
  AddressFieldInputType,
  AddressFieldType,
} from '../../fields';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { BaseFieldDto } from './base-field.dto';

export class AddressFieldDto extends BaseFieldDto implements AddressField {
  @ApiProperty({
    type: String,
    enum: [ADDRESS_FIELD_TYPE_VALUE],
    default: ADDRESS_FIELD_TYPE_VALUE,
  })
  @IsString()
  readonly type: AddressFieldType;

  @ApiProperty({
    type: String,
    enum: [Object.values(ADDRESS_INPUT_TYPE_VALUE)],
    default: Object.values(ADDRESS_INPUT_TYPE_VALUE)[0],
  })
  @IsString()
  inputType?: AddressFieldInputType;
}
