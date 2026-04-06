import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateReviewTable1775486533013 implements MigrationInterface {
    name = 'CreateReviewTable1775486533013'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservation" ADD "hotel" character varying`);
        await queryRunner.query(`ALTER TABLE "reservation" ADD "specialRequest" character varying`);
        await queryRunner.query(`ALTER TABLE "reservation" ADD "roomNumber" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservation" DROP COLUMN "roomNumber"`);
        await queryRunner.query(`ALTER TABLE "reservation" DROP COLUMN "specialRequest"`);
        await queryRunner.query(`ALTER TABLE "reservation" DROP COLUMN "hotel"`);
    }

}
