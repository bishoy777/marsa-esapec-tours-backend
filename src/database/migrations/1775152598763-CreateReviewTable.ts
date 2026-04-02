import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateReviewTable1775152598763 implements MigrationInterface {
    name = 'CreateReviewTable1775152598763'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trip" ADD "included" text array NOT NULL`);
        await queryRunner.query(`ALTER TABLE "trip" ADD "excluded" text array NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trip" DROP COLUMN "excluded"`);
        await queryRunner.query(`ALTER TABLE "trip" DROP COLUMN "included"`);
    }

}
