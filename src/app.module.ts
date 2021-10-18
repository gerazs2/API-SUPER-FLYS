import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PassengerModule } from './passenger/passenger.module';
import { FlightModule } from './flight/flight.module';

@Module({
  imports: [
    //configuracion variables entorno
    ConfigModule.forRoot({
      envFilePath: ['.env.development'], 
      isGlobal:true,
    }),
    UserModule,
    PassengerModule,
    FlightModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
