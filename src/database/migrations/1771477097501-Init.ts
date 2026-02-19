import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1771477097501 implements MigrationInterface {
    name = 'Init1771477097501'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "faq" ("id" SERIAL NOT NULL, "question" character varying NOT NULL, "answer" character varying NOT NULL, CONSTRAINT "PK_d6f5a52b1a96dd8d0591f9fbc47" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "taxi" DROP COLUMN "askForSim"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "taxi" ADD "askForSim" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`DROP TABLE "faq"`);
    }

}
