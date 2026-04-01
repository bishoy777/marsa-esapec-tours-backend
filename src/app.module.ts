import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { I18nModule, QueryResolver, HeaderResolver } from 'nestjs-i18n';
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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // ✅ IMPORTANT
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] }, // ?lang=en
        HeaderResolver, // Accept-Language header
      ],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DB_URL,
      autoLoadEntities: true,
      synchronize: false, // ⚠️ dev only
      ssl: {
        rejectUnauthorized: false, // ✅ required for Supabase
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
