import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema()
export class Device extends Document {

    @Prop({
        index:true,
        unique:true
    })
    UID:number

    @Prop()
    gatewayId:string

    @Prop()
    vendor:string

    @Prop()
    createdAt:string

    @Prop({
        default: true,
    })
    isOnline:boolean

    @Prop({
        default: true,
    })
    state:boolean

}

export const DeviceSchema = SchemaFactory.createForClass(Device);
DeviceSchema.methods.toJSON = function (){
    const {__v,...device } = this.toObject();
    return device;
}
