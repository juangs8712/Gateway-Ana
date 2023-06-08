import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { GatewayService } from './gateway.service';
import { CreateGatewayDto, UpdateGatewayDto } from './dto/index';
import { DevicesService } from 'src/devices/devices.service';

@ApiTags('Gateways')
@Controller('gateway')
export class GatewayController {
// -----------------------------------------------------
  constructor(
    private readonly gatewayService: GatewayService,
   ) {}
 // ----------------------------------------------------- 
  @ApiOperation({ summary: 'Create Gateway' })
  @Post('create')
  create(@Body() createGatewayDto: CreateGatewayDto) {
    return this.gatewayService.create(createGatewayDto);
  }
// -----------------------------------------------------
  @ApiOperation({ summary: 'Find all gateways' })
  @Get('all')
  findAll() {
    return this.gatewayService.findAll();
  }
// -----------------------------------------------------
@ApiOperation({ summary: 'Find all gateways and their devices' })
@Get('allDetails')
async findAllAndDetails() {
  return this.gatewayService.findAllandDetails();  
}
// -----------------------------------------------------

@ApiOperation({ summary: 'Find one by id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gatewayService.findOne(id);
  }
// -----------------------------------------------------

@ApiOperation({ summary: 'Update gateway' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGatewayDto: UpdateGatewayDto) {
    return this.gatewayService.update(id, updateGatewayDto);
  }
// -----------------------------------------------------
  @ApiOperation({ summary: 'Remove gateway' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gatewayService.remove(id);
  }
// -----------------------------------------------------
}
