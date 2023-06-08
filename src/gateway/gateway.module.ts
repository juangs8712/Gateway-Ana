
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { GatewayService } from './gateway.service';
import { GatewayController } from './gateway.controller';
import { Gateway, GatewaySchema } from './entities/gateway.entity';

@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name: Gateway.name,
        schema: GatewaySchema,
      },
    ]),
  ],
  controllers: [GatewayController],
  providers: [GatewayService],
  exports:[GatewayService]
})
export class GatewayModule {}
