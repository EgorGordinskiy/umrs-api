import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Geometry,
} from 'typeorm';
import { GisLayer } from '../gis-layer/gis-layer.entity';

@Entity()
export class GisFeature {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('geometry')
  geometry: Geometry;

  @Column('jsonb', { nullable: true })
  properties: { [key: string]: string | number | boolean | Date };

  @ManyToOne(() => GisLayer, (layer) => layer.features)
  layer: GisLayer;
}
