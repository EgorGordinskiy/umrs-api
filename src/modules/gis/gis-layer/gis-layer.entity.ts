import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { GisField } from '../gis-field/gis-field.entity';
import { GisFeature } from '../gis-feature/gis-feature.entity';

export enum GeometryType {
  POINT = 'Point',
  LINE_STRING = 'LineString',
  POLYGON = 'Polygon',
}

@Entity()
export class GisLayer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: GeometryType,
  })
  geometryType: GeometryType;

  @OneToMany(() => GisField, (field) => field.layer, {
    cascade: true,
  })
  fields: GisField[];

  @OneToMany(() => GisFeature, (feature) => feature.layer, {
    cascade: true,
  })
  features: GisFeature[];
}
