import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateReviewTable1775146838131 implements MigrationInterface {
    name = 'CreateReviewTable1775146838131'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trip" DROP COLUMN "program"`);
        await queryRunner.query(`ALTER TABLE "trip" ADD "program" jsonb`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trip" DROP COLUMN "program"`);
        await queryRunner.query(`ALTER TABLE "trip" ADD "program" text NOT NULL`);
    }

}
