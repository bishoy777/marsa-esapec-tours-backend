import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateReviewTable1775071132300 implements MigrationInterface {
    name = 'CreateReviewTable1775071132300'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."trip_review_status_enum" AS ENUM('pending', 'accepted', 'rejected')`);
        await queryRunner.query(`CREATE TABLE "trip_review" ("id" SERIAL NOT NULL, "userName" character varying NOT NULL, "comment" text NOT NULL, "status" "public"."trip_review_status_enum" NOT NULL DEFAULT 'pending', "rating" integer NOT NULL, "tripId" integer, CONSTRAINT "PK_fd62cf689a214f722b8bf7fb428" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "trip_review" ADD CONSTRAINT "FK_5e27f695c47ff19a4e4d5a39859" FOREIGN KEY ("tripId") REFERENCES "trip"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trip_review" DROP CONSTRAINT "FK_5e27f695c47ff19a4e4d5a39859"`);
        await queryRunner.query(`DROP TABLE "trip_review"`);
        await queryRunner.query(`DROP TYPE "public"."trip_review_status_enum"`);
    }

}
