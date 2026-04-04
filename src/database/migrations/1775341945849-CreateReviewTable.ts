import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateReviewTable1775341945849 implements MigrationInterface {
    name = 'CreateReviewTable1775341945849'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trip" ADD "overview" text`);
        await queryRunner.query(`ALTER TABLE "trip" ADD "places" text array DEFAULT '{}'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trip" DROP COLUMN "places"`);
        await queryRunner.query(`ALTER TABLE "trip" DROP COLUMN "overview"`);
    }

}
