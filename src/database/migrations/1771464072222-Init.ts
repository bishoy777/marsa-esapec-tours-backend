import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1771464072222 implements MigrationInterface {
    name = 'Init1771464072222'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "taxi" ("id" SERIAL NOT NULL, "from" character varying NOT NULL, "to" character varying NOT NULL, "price" numeric NOT NULL, "askForSim" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_f5a58429133e3304350d066ba7a" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "taxi"`);
    }

}
