import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateReviewTable1775405054564 implements MigrationInterface {
    name = 'CreateReviewTable1775405054564'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "trip" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "overview" text, "date" TIMESTAMP NOT NULL, "included" text array NOT NULL DEFAULT '{}', "excluded" text array NOT NULL DEFAULT '{}', "places" text array DEFAULT '{}', "price" numeric(10,2) NOT NULL, "tripTypeId" integer, CONSTRAINT "PK_714c23d558208081dbccb9d9268" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "trip_image" ADD CONSTRAINT "FK_edc12b6ce28220de0a9d2280573" FOREIGN KEY ("tripId") REFERENCES "trip"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reservation" ADD CONSTRAINT "FK_dbf92e47c7c35c637c118f9b34a" FOREIGN KEY ("tripId") REFERENCES "trip"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "trip_review" ADD CONSTRAINT "FK_5e27f695c47ff19a4e4d5a39859" FOREIGN KEY ("tripId") REFERENCES "trip"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "trip_day" ADD CONSTRAINT "FK_05d58a8db071da8935693f43f50" FOREIGN KEY ("tripId") REFERENCES "trip"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "trip" ADD CONSTRAINT "FK_081c33692eb86b4c7807611a279" FOREIGN KEY ("tripTypeId") REFERENCES "trip_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trip" DROP CONSTRAINT "FK_081c33692eb86b4c7807611a279"`);
        await queryRunner.query(`ALTER TABLE "trip_day" DROP CONSTRAINT "FK_05d58a8db071da8935693f43f50"`);
        await queryRunner.query(`ALTER TABLE "trip_review" DROP CONSTRAINT "FK_5e27f695c47ff19a4e4d5a39859"`);
        await queryRunner.query(`ALTER TABLE "reservation" DROP CONSTRAINT "FK_dbf92e47c7c35c637c118f9b34a"`);
        await queryRunner.query(`ALTER TABLE "trip_image" DROP CONSTRAINT "FK_edc12b6ce28220de0a9d2280573"`);
        await queryRunner.query(`DROP TABLE "trip"`);
    }

}
