import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TripTypeModule } from './trip-type/trip-type.module';

import { TripModule } from './trip/trip.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // ✅ IMPORTANT
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: false, // ⚠️ dev only
    }),
    UsersModule,
    AuthModule,
    TripTypeModule,
    TripModule,
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
