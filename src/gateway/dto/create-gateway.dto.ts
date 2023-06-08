import { DefaultValuePipe } from "@nestjs/common/pipes";
import { ApiProperty } from "@nestjs/swagger";

import { IsString, IsIP, IsNumber, Min, Max, IsOptional } from 'class-validator';

export class CreateGatewayDto {

@ApiProperty()
@IsString()
readonly name: string;  

@ApiProperty()
@IsIP("4")
readonly IPV4_address:string;

@ApiProperty()
@IsNumber()
@IsOptional()
@Min(0)
@Max(10)
readonly allowedDevices?:number  
}
