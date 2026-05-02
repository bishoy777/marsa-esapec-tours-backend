import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { I18nModule, HeaderResolver } from 'nestjs-i18n';
import * as path from 'path';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TripTypeModule } from './trip-type/trip-type.module';

import { TripModule } from './trip/trip.module';
import { ReservationsModule } from './reservations/reservations.module';
import { TaxiModule } from './taxi/taxi.module';
import { TaxibookingModule } from './taxibooking/taxibooking.module';
import { FaqsModule } from './faqs/faqs.module';
import { TripReviewsModule } from './trip-reviews/trip-reviews.module';
import { PackageModule } from './packages/packages.module';
import { SimcardModule } from './simcard/simcard.module';
import { SimcardreviewsModule } from './simcardreviews/simcardreviews.module';
import { TaxireviewsModule } from './taxireviews/taxireviews.module';
import { TaxifaqsModule } from './taxifaqs/taxifaqs.module';
import { SimfaqsModule } from './simfaqs/simfaqs.module';
import { SimreservationModule } from './simreservation/simreservation.module';
import { PackagereservationModule } from './packagereservation/packagereservation.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
      },
      resolvers: [new HeaderResolver(['accept-language'])],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DB_URL,

      // host: 'localhost',
      // port: 5432,
      // username: 'postgres',
      // password: '1032001',
      // database: 'marsascape',
      autoLoadEntities: true,
      synchronize: false,
      ssl: {
        rejectUnauthorized: false, // ✅ required for Supabase
      },
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },

    }),
    UsersModule,
    AuthModule,
    TripTypeModule,
    TripModule,
    ReservationsModule,
    TaxiModule,
    TaxibookingModule,
    FaqsModule,
    TripReviewsModule,
    PackageModule,
    SimcardModule,
    SimcardreviewsModule,
    TaxireviewsModule,
    TaxifaqsModule,
    SimfaqsModule,
    SimreservationModule,
    PackagereservationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(LoggerMiddleware)
  //     .forRoutes({ path: '*', method: RequestMethod.GET });
  // }
}
