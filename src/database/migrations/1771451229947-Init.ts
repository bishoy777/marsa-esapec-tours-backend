import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1771451229947 implements MigrationInterface {
    name = 'Init1771451229947'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "reservation" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "phone" character varying NOT NULL, "peopleCount" integer NOT NULL, "date" date NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "tripId" integer, CONSTRAINT "PK_48b1f9922368359ab88e8bfa525" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "reservation" ADD CONSTRAINT "FK_dbf92e47c7c35c637c118f9b34a" FOREIGN KEY ("tripId") REFERENCES "trip"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservation" DROP CONSTRAINT "FK_dbf92e47c7c35c637c118f9b34a"`);
        await queryRunner.query(`DROP TABLE "reservation"`);
    }

}
