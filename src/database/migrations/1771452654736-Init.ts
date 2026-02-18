import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1771452654736 implements MigrationInterface {
    name = 'Init1771452654736'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."reservation_status_enum" AS ENUM('pending', 'confirmed', 'cancelled', 'ended')`);
        await queryRunner.query(`ALTER TABLE "reservation" ADD "status" "public"."reservation_status_enum" NOT NULL DEFAULT 'pending'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservation" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."reservation_status_enum"`);
    }

}
