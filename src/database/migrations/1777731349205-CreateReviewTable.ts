import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateReviewTable1777731349205 implements MigrationInterface {
    name = 'CreateReviewTable1777731349205'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "package" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "price" numeric NOT NULL, "included" text array NOT NULL, "excluded" text array NOT NULL, "highlights" text array NOT NULL, "description" character varying, CONSTRAINT "PK_308364c66df656295bc4ec467c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "trip_image" ("id" SERIAL NOT NULL, "url" character varying NOT NULL, "tripId" integer, CONSTRAINT "PK_40844cedea2c2514d75c1238bb4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."reservation_status_enum" AS ENUM('pending', 'confirmed', 'cancelled', 'ended')`);
        await queryRunner.query(`CREATE TABLE "reservation" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "hotel" character varying, "specialRequest" character varying, "phone" character varying NOT NULL, "peopleCount" integer NOT NULL, "roomNumber" integer, "date" date NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "status" "public"."reservation_status_enum" NOT NULL DEFAULT 'pending', "tripId" integer, CONSTRAINT "PK_48b1f9922368359ab88e8bfa525" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."trip_review_status_enum" AS ENUM('pending', 'accepted', 'rejected')`);
        await queryRunner.query(`CREATE TABLE "trip_review" ("id" SERIAL NOT NULL, "userName" character varying NOT NULL, "comment" text NOT NULL, "status" "public"."trip_review_status_enum" NOT NULL DEFAULT 'pending', "rating" integer NOT NULL, "tripId" integer, CONSTRAINT "PK_fd62cf689a214f722b8bf7fb428" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "trip_day" ("id" SERIAL NOT NULL, "morning" text array NOT NULL DEFAULT '{}', "afternoon" text array NOT NULL DEFAULT '{}', "evining" text array NOT NULL DEFAULT '{}', "tripId" integer, CONSTRAINT "PK_22c09bc2360526eb49095589b59" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "trip" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "overview" text, "date" TIMESTAMP NOT NULL DEFAULT now(), "included" text array NOT NULL DEFAULT '{}', "excluded" text array NOT NULL DEFAULT '{}', "places" text array DEFAULT '{}', "price" numeric(10,2) NOT NULL, "tripTypeId" integer, CONSTRAINT "PK_714c23d558208081dbccb9d9268" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "trip_type" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, CONSTRAINT "PK_b80a1e112ae33caa104b8fd0e39" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."taxi_review_status_enum" AS ENUM('pending', 'accepted', 'rejected')`);
        await queryRunner.query(`CREATE TABLE "taxi_review" ("id" SERIAL NOT NULL, "userName" character varying NOT NULL, "rating" integer NOT NULL, "comment" text NOT NULL, "status" "public"."taxi_review_status_enum" NOT NULL DEFAULT 'pending', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f15735d763c666de2af8f977c7c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "taxifaq" ("id" SERIAL NOT NULL, "question" character varying NOT NULL, "answer" character varying NOT NULL, CONSTRAINT "PK_cc16e75cdacf7df3247f137bcf3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "taxi" ("id" SERIAL NOT NULL, "from" character varying NOT NULL, "to" character varying NOT NULL, "isHotel" boolean NOT NULL, "sedanPrice" numeric NOT NULL, "HighSprice" numeric NOT NULL, CONSTRAINT "PK_f5a58429133e3304350d066ba7a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "taxibooking" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "date" character varying NOT NULL, "phone" character varying NOT NULL, "totalPrice" character varying NOT NULL, "carType" character varying NOT NULL, "peopleCount" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "simCapacity" character varying DEFAULT '', "simCards" integer, "flightroomNumber" integer, "specialRequest" character varying DEFAULT '', "taxiId" integer, CONSTRAINT "PK_c86e5443b3341359a8df09f1525" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sim_reservations" ("id" SERIAL NOT NULL, "simPackage" character varying NOT NULL, "cardsCount" integer NOT NULL, "deliveryLocation" character varying NOT NULL, "date" TIMESTAMP NOT NULL, "roomNumber" integer NOT NULL, "price" integer NOT NULL, "fullName" character varying NOT NULL, "phone" character varying NOT NULL, "specialRequest" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3aa15cd45228349b5e2b7385ad0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "simfaq" ("id" SERIAL NOT NULL, "question" character varying NOT NULL, "answer" character varying NOT NULL, CONSTRAINT "PK_1503230cf650ead4b1c9cd9c231" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."review_status_enum" AS ENUM('pending', 'accepted', 'rejected')`);
        await queryRunner.query(`CREATE TABLE "review" ("id" SERIAL NOT NULL, "userName" character varying NOT NULL, "rating" integer NOT NULL, "comment" text NOT NULL, "status" "public"."review_status_enum" NOT NULL DEFAULT 'pending', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2e4299a343a81574217255c00ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "simcard" ("id" SERIAL NOT NULL, "price" numeric NOT NULL, "capacity" character varying NOT NULL, "duration" character varying, CONSTRAINT "PK_f6c8087b2aebd1c0affc867123e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."packagereservation_status_enum" AS ENUM('pending', 'confirmed', 'cancelled', 'ended')`);
        await queryRunner.query(`CREATE TABLE "packagereservation" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "phone" character varying NOT NULL, "peopleCount" integer NOT NULL, "hotel" character varying, "roomNumber" integer, "price" integer, "specialRequest" character varying, "date" date NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "status" "public"."packagereservation_status_enum" NOT NULL DEFAULT 'pending', CONSTRAINT "PK_67d2308af0cfe01ce34684da03e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "faq" ("id" SERIAL NOT NULL, "question" character varying NOT NULL, "answer" character varying NOT NULL, CONSTRAINT "PK_d6f5a52b1a96dd8d0591f9fbc47" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "package_trips_trip" ("packageId" integer NOT NULL, "tripId" integer NOT NULL, CONSTRAINT "PK_528b3cf8597fbb5ef51093a9f2f" PRIMARY KEY ("packageId", "tripId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8c413848df5385b783b91abd15" ON "package_trips_trip" ("packageId") `);
        await queryRunner.query(`CREATE INDEX "IDX_6b5b25bed5949fdedf21969106" ON "package_trips_trip" ("tripId") `);
        await queryRunner.query(`CREATE TABLE "packagereservation_trips_trip" ("packagereservationId" integer NOT NULL, "tripId" integer NOT NULL, CONSTRAINT "PK_a0735f6ef37823b63a293816f79" PRIMARY KEY ("packagereservationId", "tripId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f9235ae403c17b99470320480c" ON "packagereservation_trips_trip" ("packagereservationId") `);
        await queryRunner.query(`CREATE INDEX "IDX_bbc5132830694a260d9865d3d0" ON "packagereservation_trips_trip" ("tripId") `);
        await queryRunner.query(`ALTER TABLE "trip_image" ADD CONSTRAINT "FK_edc12b6ce28220de0a9d2280573" FOREIGN KEY ("tripId") REFERENCES "trip"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reservation" ADD CONSTRAINT "FK_dbf92e47c7c35c637c118f9b34a" FOREIGN KEY ("tripId") REFERENCES "trip"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "trip_review" ADD CONSTRAINT "FK_5e27f695c47ff19a4e4d5a39859" FOREIGN KEY ("tripId") REFERENCES "trip"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "trip_day" ADD CONSTRAINT "FK_05d58a8db071da8935693f43f50" FOREIGN KEY ("tripId") REFERENCES "trip"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "trip" ADD CONSTRAINT "FK_081c33692eb86b4c7807611a279" FOREIGN KEY ("tripTypeId") REFERENCES "trip_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "taxibooking" ADD CONSTRAINT "FK_e5b27f6e11d2ef6f922e4ad8ba0" FOREIGN KEY ("taxiId") REFERENCES "taxi"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "package_trips_trip" ADD CONSTRAINT "FK_8c413848df5385b783b91abd154" FOREIGN KEY ("packageId") REFERENCES "package"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "package_trips_trip" ADD CONSTRAINT "FK_6b5b25bed5949fdedf21969106b" FOREIGN KEY ("tripId") REFERENCES "trip"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "packagereservation_trips_trip" ADD CONSTRAINT "FK_f9235ae403c17b99470320480ca" FOREIGN KEY ("packagereservationId") REFERENCES "packagereservation"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "packagereservation_trips_trip" ADD CONSTRAINT "FK_bbc5132830694a260d9865d3d0b" FOREIGN KEY ("tripId") REFERENCES "trip"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "packagereservation_trips_trip" DROP CONSTRAINT "FK_bbc5132830694a260d9865d3d0b"`);
        await queryRunner.query(`ALTER TABLE "packagereservation_trips_trip" DROP CONSTRAINT "FK_f9235ae403c17b99470320480ca"`);
        await queryRunner.query(`ALTER TABLE "package_trips_trip" DROP CONSTRAINT "FK_6b5b25bed5949fdedf21969106b"`);
        await queryRunner.query(`ALTER TABLE "package_trips_trip" DROP CONSTRAINT "FK_8c413848df5385b783b91abd154"`);
        await queryRunner.query(`ALTER TABLE "taxibooking" DROP CONSTRAINT "FK_e5b27f6e11d2ef6f922e4ad8ba0"`);
        await queryRunner.query(`ALTER TABLE "trip" DROP CONSTRAINT "FK_081c33692eb86b4c7807611a279"`);
        await queryRunner.query(`ALTER TABLE "trip_day" DROP CONSTRAINT "FK_05d58a8db071da8935693f43f50"`);
        await queryRunner.query(`ALTER TABLE "trip_review" DROP CONSTRAINT "FK_5e27f695c47ff19a4e4d5a39859"`);
        await queryRunner.query(`ALTER TABLE "reservation" DROP CONSTRAINT "FK_dbf92e47c7c35c637c118f9b34a"`);
        await queryRunner.query(`ALTER TABLE "trip_image" DROP CONSTRAINT "FK_edc12b6ce28220de0a9d2280573"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bbc5132830694a260d9865d3d0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f9235ae403c17b99470320480c"`);
        await queryRunner.query(`DROP TABLE "packagereservation_trips_trip"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6b5b25bed5949fdedf21969106"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8c413848df5385b783b91abd15"`);
        await queryRunner.query(`DROP TABLE "package_trips_trip"`);
        await queryRunner.query(`DROP TABLE "faq"`);
        await queryRunner.query(`DROP TABLE "packagereservation"`);
        await queryRunner.query(`DROP TYPE "public"."packagereservation_status_enum"`);
        await queryRunner.query(`DROP TABLE "simcard"`);
        await queryRunner.query(`DROP TABLE "review"`);
        await queryRunner.query(`DROP TYPE "public"."review_status_enum"`);
        await queryRunner.query(`DROP TABLE "simfaq"`);
        await queryRunner.query(`DROP TABLE "sim_reservations"`);
        await queryRunner.query(`DROP TABLE "taxibooking"`);
        await queryRunner.query(`DROP TABLE "taxi"`);
        await queryRunner.query(`DROP TABLE "taxifaq"`);
        await queryRunner.query(`DROP TABLE "taxi_review"`);
        await queryRunner.query(`DROP TYPE "public"."taxi_review_status_enum"`);
        await queryRunner.query(`DROP TABLE "trip_type"`);
        await queryRunner.query(`DROP TABLE "trip"`);
        await queryRunner.query(`DROP TABLE "trip_day"`);
        await queryRunner.query(`DROP TABLE "trip_review"`);
        await queryRunner.query(`DROP TYPE "public"."trip_review_status_enum"`);
        await queryRunner.query(`DROP TABLE "reservation"`);
        await queryRunner.query(`DROP TYPE "public"."reservation_status_enum"`);
        await queryRunner.query(`DROP TABLE "trip_image"`);
        await queryRunner.query(`DROP TABLE "package"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
