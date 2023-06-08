import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateDeviceDto, UpdateDeviceDto } from './dto/index';
import { DevicesService } from './devices.service';

@ApiTags('Devices')
@Controller('devices')
export class DevicesController {
// -----------------------------------------------------
  constructor(private readonly deviceService: DevicesService) {}
 // ----------------------------------------------------- 
  @ApiOperation({ summary: 'Create Device' })
  @Post('create')
  create(@Body() createdeviceDto: CreateDeviceDto) {
    return this.deviceService.create(createdeviceDto);
  }
// -----------------------------------------------------
  @ApiOperation({ summary: 'Get all devices' })
  @Get()
  findAll() {
    return this.deviceService.findAll();
  }
// -----------------------------------------------------
@ApiOperation({ summary: 'Find by id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deviceService.findOne(id);
  }
// -----------------------------------------------------
@ApiOperation({ summary: 'Find devices by Gateway id' })
  @Get('byGatewayId/:id')
  findByGatewayId(@Param('id') id: string) {
    return this.deviceService.findByGatewayId(id);
  }
// -----------------------------------------------------


@ApiOperation({ summary: 'Update device' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeviceDto: UpdateDeviceDto) {
    return this.deviceService.update(id, updateDeviceDto);
  }
// -----------------------------------------------------
  @ApiOperation({ summary: 'Remove device' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deviceService.remove(id);
  }
// -----------------------------------------------------
}

