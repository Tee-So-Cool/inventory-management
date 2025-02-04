// src/inventory/inventory.controller.ts
import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post('items')
  create(@Body() createItemDto: CreateItemDto) {
    return this.inventoryService.create(createItemDto);
  }

  @Get('items/:id')
  findOne(@Param('id') id: string) {
    return this.inventoryService.findOne(id);
  }

  @Patch('items/:id')
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.inventoryService.update(id, updateItemDto);
  }

  @Delete('items/:id')
  remove(@Param('id') id: string) {
    return this.inventoryService.remove(id);
  }

  @Get(':productName')
  findByProductName(@Param('productName') productName: string) {
    return this.inventoryService.findByProductName(productName);
  }
}