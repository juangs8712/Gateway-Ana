import { Module } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Device, DeviceSchema } from './entities/device.entity';
import { GatewayModule } from 'src/gateway/gateway.module';


@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name: Device.name,
        schema: DeviceSchema,
      },
    ]),
    GatewayModule
  ],
  controllers: [DevicesController],
  providers: [DevicesService]
})
export class DevicesModule {}
