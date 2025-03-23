import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { GisFieldType } from '../gis-field-type/field-type.entity';
import { GisLayer } from '../gis-layer/gis-layer.entity';

@Entity()
export class GisField {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => GisFieldType, (fieldType) => fieldType.fields)
  type: GisFieldType;

  @ManyToOne(() => GisLayer, (layer) => layer.fields)
  layer: GisLayer;
}
