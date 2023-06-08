
import { Module } from '@nestjs/common';
import { GatewayModule } from './gateway/gateway.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DevicesModule } from './devices/devices.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),    
    GatewayModule,
    MongooseModule.forRoot(process.env.MONGODB_CNN),
    DevicesModule,],
 
})
export class AppModule {}
