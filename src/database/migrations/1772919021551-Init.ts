import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1772919021551 implements MigrationInterface {
    name = 'Init1772919021551'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "trip_image" ("id" SERIAL NOT NULL, "url" character varying NOT NULL, "tripId" integer, CONSTRAINT "PK_40844cedea2c2514d75c1238bb4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."reservation_status_enum" AS ENUM('pending', 'confirmed', 'cancelled', 'ended')`);
        await queryRunner.query(`CREATE TABLE "reservation" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "phone" character varying NOT NULL, "peopleCount" integer NOT NULL, "date" date NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "status" "public"."reservation_status_enum" NOT NULL DEFAULT 'pending', "tripId" integer, CONSTRAINT "PK_48b1f9922368359ab88e8bfa525" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "trip" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "time" TIMESTAMP NOT NULL, "price" numeric NOT NULL, "program" text NOT NULL, "tripTypeId" integer, CONSTRAINT "PK_714c23d558208081dbccb9d9268" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "trip_type" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, CONSTRAINT "PK_b80a1e112ae33caa104b8fd0e39" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "taxi" ("id" SERIAL NOT NULL, "from" character varying NOT NULL, "to" character varying NOT NULL, "price" numeric NOT NULL, CONSTRAINT "PK_f5a58429133e3304350d066ba7a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "taxibooking" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "phone" character varying NOT NULL, "peopleCount" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "askForSim" boolean NOT NULL DEFAULT false, "taxiId" integer, CONSTRAINT "PK_c86e5443b3341359a8df09f1525" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "faq" ("id" SERIAL NOT NULL, "question" character varying NOT NULL, "answer" character varying NOT NULL, CONSTRAINT "PK_d6f5a52b1a96dd8d0591f9fbc47" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "trip_image" ADD CONSTRAINT "FK_edc12b6ce28220de0a9d2280573" FOREIGN KEY ("tripId") REFERENCES "trip"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reservation" ADD CONSTRAINT "FK_dbf92e47c7c35c637c118f9b34a" FOREIGN KEY ("tripId") REFERENCES "trip"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "trip" ADD CONSTRAINT "FK_081c33692eb86b4c7807611a279" FOREIGN KEY ("tripTypeId") REFERENCES "trip_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "taxibooking" ADD CONSTRAINT "FK_e5b27f6e11d2ef6f922e4ad8ba0" FOREIGN KEY ("taxiId") REFERENCES "taxi"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "taxibooking" DROP CONSTRAINT "FK_e5b27f6e11d2ef6f922e4ad8ba0"`);
        await queryRunner.query(`ALTER TABLE "trip" DROP CONSTRAINT "FK_081c33692eb86b4c7807611a279"`);
        await queryRunner.query(`ALTER TABLE "reservation" DROP CONSTRAINT "FK_dbf92e47c7c35c637c118f9b34a"`);
        await queryRunner.query(`ALTER TABLE "trip_image" DROP CONSTRAINT "FK_edc12b6ce28220de0a9d2280573"`);
        await queryRunner.query(`DROP TABLE "faq"`);
        await queryRunner.query(`DROP TABLE "taxibooking"`);
        await queryRunner.query(`DROP TABLE "taxi"`);
        await queryRunner.query(`DROP TABLE "trip_type"`);
        await queryRunner.query(`DROP TABLE "trip"`);
        await queryRunner.query(`DROP TABLE "reservation"`);
        await queryRunner.query(`DROP TYPE "public"."reservation_status_enum"`);
        await queryRunner.query(`DROP TABLE "trip_image"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
