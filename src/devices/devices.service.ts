
import { InjectModel } from '@nestjs/mongoose';
import { Injectable,
         BadRequestException,  
         InternalServerErrorException,
         NotFoundException } from '@nestjs/common';

import { isMongoId } from 'class-validator';
import {v4 as uuidv4} from 'uuid'
import { Model } from 'mongoose';

import { CreateDeviceDto , UpdateDeviceDto   } from './dto/index';
import { Device } from './entities/device.entity';
import { GatewayService } from 'src/gateway/gateway.service';

@Injectable()
export class DevicesService {

// -----------------------------------------------------
  constructor(
    @InjectModel(Device.name)
    private readonly deviceModel: Model<Device>,
    private readonly gatewayService:GatewayService
  ) {}
// -----------------------------------------------------
  async create(createDeviceDto: CreateDeviceDto) {
    const {gatewayId} = createDeviceDto;
    const devicesQty = await this.deviceModel.find({gatewayId}).count();
    const allowedDevices = await this.gatewayService.getAllowedDevices(gatewayId);
    if(devicesQty >= allowedDevices){
      return `This gateway doesn't allow more devices`;
    }
    try {
        const deviceToInsert={
        UID:this.generateNumericid(),
        ...createDeviceDto,
        updatedAt:new Date()
      }
      const deviceCreated = await this.deviceModel.create(deviceToInsert);
      return (`Device has been created succesfully!!! \n ${JSON.stringify(deviceCreated)}`);
    } catch (error) {
      if ( error.code === 11000 ) {
        throw new BadRequestException(`The device ${ JSON.stringify( error.keyValue )} already exists in DB`);
      }
      throw new InternalServerErrorException(`Can't create device.Internal server error`);
    }
  }
// -----------------------------------------------------
  async findAll() {
    return await this.deviceModel.find({state:true});
  }
// -----------------------------------------------------
  async findOne(id: string) {
    if(!isMongoId(id))
      throw new BadRequestException(`Id is not a valid MongoId`);
    let device = await this.deviceModel.findOne({_id:id,state:true});
    if(!device){
      throw new NotFoundException(`Device not found`)
    }
    return device;
   }
// -----------------------------------------------------
async findByGatewayId(gatewayId: string) {
  
  if(!isMongoId(gatewayId))
    throw new BadRequestException(`Id is not a valid MongoId`);
  let devices = await this.deviceModel.find({gatewayId, state:true});
  if(!devices){
    throw new NotFoundException(`Device not found`)
  }
  return devices;

}
// -----------------------------------------------------
  async update(id: string, updateDeviceDto: UpdateDeviceDto) {
    const device = await this.findOne(id);
    try {
       await device.updateOne(updateDeviceDto);
       return `Device con el id ${id} has been updated succesfully \n ${JSON.stringify(updateDeviceDto)}`;
    } catch (error) {
      throw new InternalServerErrorException(`Can't update device. Internal server error`)
      
    }
  }
// -----------------------------------------------------
async remove(id:string) {
  const device = await this.findOne(id);
  try {
    await device.updateOne({state:false});
    return `Device has been removed succesfully`;
  } catch (error) {
    throw new InternalServerErrorException(`Can't remove device. Internal server error`)
    
  }
}
// -----------------------------------------------------
 generateNumericid(){
  const generatedUuid = uuidv4();
  const numericId = generatedUuid.replace(/\D/g, ''); // Remove non-numeric characters
  return numericId;

 }

}

