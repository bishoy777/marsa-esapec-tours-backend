import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1771470328503 implements MigrationInterface {
    name = 'Init1771470328503'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "taxibooking" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "phone" character varying NOT NULL, "peopleCount" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "askForSim" boolean NOT NULL DEFAULT false, "taxiId" integer, CONSTRAINT "PK_c86e5443b3341359a8df09f1525" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "taxibooking" ADD CONSTRAINT "FK_e5b27f6e11d2ef6f922e4ad8ba0" FOREIGN KEY ("taxiId") REFERENCES "taxi"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "taxibooking" DROP CONSTRAINT "FK_e5b27f6e11d2ef6f922e4ad8ba0"`);
        await queryRunner.query(`DROP TABLE "taxibooking"`);
    }

}
