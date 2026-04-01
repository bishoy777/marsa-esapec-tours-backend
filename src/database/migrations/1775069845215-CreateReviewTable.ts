import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateReviewTable1775069845215 implements MigrationInterface {
    name = 'CreateReviewTable1775069845215'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."review_status_enum" AS ENUM('pending', 'accepted', 'rejected')`);
        await queryRunner.query(`CREATE TABLE "review" ("id" SERIAL NOT NULL, "userName" character varying NOT NULL, "comment" text NOT NULL, "status" "public"."review_status_enum" NOT NULL DEFAULT 'pending', "rating" integer NOT NULL, "tripId" integer, CONSTRAINT "PK_2e4299a343a81574217255c00ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_e0661831ac9a66e41a51d68905e" FOREIGN KEY ("tripId") REFERENCES "trip"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_e0661831ac9a66e41a51d68905e"`);
        await queryRunner.query(`DROP TABLE "review"`);
        await queryRunner.query(`DROP TYPE "public"."review_status_enum"`);
    }

}
