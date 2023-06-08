import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Gateway extends Document {

@Prop()
name:string;

@Prop()
IPV4_address:string;

@Prop({
    default:10
})
allowedDevices:number;

@Prop({
    default: true,
})
state:boolean

}

export const GatewaySchema = SchemaFactory.createForClass(Gateway);
GatewaySchema.methods.toJSON = function (){
    const {__v,...gateway } = this.toObject();
    return gateway;
}

