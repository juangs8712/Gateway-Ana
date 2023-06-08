import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateDeviceDto {
        
    @ApiProperty()
    @IsString()
    readonly gatewayId:string;

    @ApiProperty()
    @IsString()
    readonly vendor:string;

    @ApiProperty()
    @IsBoolean()
    @IsOptional()
    readonly isOnline?:boolean;
}
