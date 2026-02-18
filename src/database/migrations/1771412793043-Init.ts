import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1771412793043 implements MigrationInterface {
    name = 'Init1771412793043'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "trip_type" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, CONSTRAINT "PK_b80a1e112ae33caa104b8fd0e39" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "trip_type"`);
    }

}
