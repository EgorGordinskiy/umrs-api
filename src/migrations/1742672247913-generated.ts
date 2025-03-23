import { MigrationInterface, QueryRunner } from 'typeorm';

export class Generated1742672247913 implements MigrationInterface {
  name = 'Generated1742672247913';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "gis_feature" ("id" SERIAL NOT NULL, "geometry" geometry NOT NULL, "properties" jsonb, "layerId" integer, CONSTRAINT "PK_9a56f604b72471ce00d9397a76c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."gis_layer_geometrytype_enum" AS ENUM('Point', 'LineString', 'Polygon')`,
    );
    await queryRunner.query(
      `CREATE TABLE "gis_layer" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "geometryType" "public"."gis_layer_geometrytype_enum" NOT NULL, CONSTRAINT "PK_5a61d866bb264a2118991e9bc49" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "gis_field" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "typeId" integer, "layerId" integer, CONSTRAINT "PK_ff45bcb3d07af2d90be090049b9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."gis_field_type_type_enum" AS ENUM('string', 'number', 'boolean', 'date')`,
    );
    await queryRunner.query(
      `CREATE TABLE "gis_field_type" ("id" SERIAL NOT NULL, "type" "public"."gis_field_type_type_enum" NOT NULL, "description" character varying NOT NULL, CONSTRAINT "UQ_6fbe97b6d3db28de123a4ff5ae8" UNIQUE ("type"), CONSTRAINT "PK_5945f8ae6130eecc860730366d7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "gis_feature" ADD CONSTRAINT "FK_d7e594c5601bba73d4b74e68990" FOREIGN KEY ("layerId") REFERENCES "gis_layer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "gis_field" ADD CONSTRAINT "FK_f5592abdc0e1a8ba759be04b883" FOREIGN KEY ("typeId") REFERENCES "gis_field_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "gis_field" ADD CONSTRAINT "FK_18f5736c61bdd1ef78e7247d8dd" FOREIGN KEY ("layerId") REFERENCES "gis_layer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "gis_field" DROP CONSTRAINT "FK_18f5736c61bdd1ef78e7247d8dd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "gis_field" DROP CONSTRAINT "FK_f5592abdc0e1a8ba759be04b883"`,
    );
    await queryRunner.query(
      `ALTER TABLE "gis_feature" DROP CONSTRAINT "FK_d7e594c5601bba73d4b74e68990"`,
    );
    await queryRunner.query(`DROP TABLE "gis_field_type"`);
    await queryRunner.query(`DROP TYPE "public"."gis_field_type_type_enum"`);
    await queryRunner.query(`DROP TABLE "gis_field"`);
    await queryRunner.query(`DROP TABLE "gis_layer"`);
    await queryRunner.query(`DROP TYPE "public"."gis_layer_geometrytype_enum"`);
    await queryRunner.query(`DROP TABLE "gis_feature"`);
  }
}
