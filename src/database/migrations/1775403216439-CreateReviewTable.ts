import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateReviewTable1775403216439 implements MigrationInterface {
    name = 'CreateReviewTable1775403216439'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trip_day" DROP COLUMN "dayNumber"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trip_day" ADD "dayNumber" integer NOT NULL`);
    }

}
