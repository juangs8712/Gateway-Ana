import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateGatewayDto } from './create-gateway.dto';
import { MIN, Max, Min } from 'class-validator';

export class UpdateGatewayDto extends PartialType(CreateGatewayDto) {

  
}
