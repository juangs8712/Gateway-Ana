import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model} from 'mongoose';
import { isMongoId } from 'class-validator';

import { CreateGatewayDto , UpdateGatewayDto   } from './dto/index';
import { Gateway } from './entities/gateway.entity';


@Injectable()
export class GatewayService {

// -----------------------------------------------------
  constructor(
    @InjectModel(Gateway.name)
    private readonly gatewayModel: Model<Gateway>  
  ) {}
// -----------------------------------------------------
  async create(createGatewayDto: CreateGatewayDto) {
    try {
      const gateway = await this.gatewayModel.create(createGatewayDto);
      return (`Gateway has been created succesfully!!! \n ${JSON.stringify(gateway)}`);
    } catch (error) {
      if ( error.code === 11000 ) {
        throw new BadRequestException(`The gateway ${ JSON.stringify( error.keyValue )} already exists in DB`);
      }
      throw new InternalServerErrorException(`Can't create gateway.Internal server error`);
    }
  }
// -----------------------------------------------------
  async findAll() {
    return await this.gatewayModel.find({state:true});
  }
// -----------------------------------------------------
  async findAllandDetails() {
  let data = await this.gatewayModel.aggregate([
      {
        $lookup: {
          from: "devices",
          let: { collection1Id: "$gatewayId" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$collection1Id", "$$collection1Id"] }
              }
            }
          ],
          as: "Peripheral Devices"
        }
      }
    ])
   return data; 
  }
// -----------------------------------------------------
  async findOne(id: string) {
    if(!isMongoId(id))
    throw new BadRequestException(`Id is not a valid MongoId`);
    let gateway = await this.gatewayModel.findOne({_id:id,state:true});
    if(!gateway){
      throw new NotFoundException(`Gateway not found`)
    }
    return gateway;
   }
  
// -----------------------------------------------------
  async update(id: string, updateGatewayDto: UpdateGatewayDto) {
    const gateway = await this.findOne(id);
    try {
       await gateway.updateOne(updateGatewayDto);
       return `Gateway con el id ${id} has been updated succesfully \n ${JSON.stringify(updateGatewayDto)}`;
    } catch (error) {
      throw new InternalServerErrorException(`Can't update gateway. Internal server error`)
      
    }
  }
// -----------------------------------------------------
  async remove(id:string) {
    const gateway = await this.findOne(id);
    try {
      await gateway.updateOne({state:false});
      return `Gateway has been removed succesfully`;
    } catch (error) {
      throw new InternalServerErrorException(`Can't remove gateway. Internal server error`)
      
    }
  }
// -----------------------------------------------------
async getAllowedDevices(id:string) {
  const device = await this.gatewayModel
  .findById({_id:id})
  .select('allowedDevices');
  return device.allowedDevices;
}

}
