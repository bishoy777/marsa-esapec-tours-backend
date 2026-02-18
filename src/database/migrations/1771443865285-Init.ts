import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1771443865285 implements MigrationInterface {
    name = 'Init1771443865285'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trip_image" DROP CONSTRAINT "FK_edc12b6ce28220de0a9d2280573"`);
        await queryRunner.query(`ALTER TABLE "trip_image" ALTER COLUMN "tripId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "trip_image" ADD CONSTRAINT "FK_edc12b6ce28220de0a9d2280573" FOREIGN KEY ("tripId") REFERENCES "trip"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trip_image" DROP CONSTRAINT "FK_edc12b6ce28220de0a9d2280573"`);
        await queryRunner.query(`ALTER TABLE "trip_image" ALTER COLUMN "tripId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "trip_image" ADD CONSTRAINT "FK_edc12b6ce28220de0a9d2280573" FOREIGN KEY ("tripId") REFERENCES "trip"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
