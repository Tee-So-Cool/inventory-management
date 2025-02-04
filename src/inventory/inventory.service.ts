import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class InventoryService {
    constructor(
        @InjectRepository(Item)
        private readonly itemRepository: Repository<Item>,
    ) { }

    async create(createItemDto: CreateItemDto): Promise<Item> {
        const item = this.itemRepository.create(createItemDto);
        return this.itemRepository.save(item);
    }

    async findAll(): Promise<Item[]> {
        return this.itemRepository.find();
    }

    async findOne(id: string): Promise<Item> {
        const item = await this.itemRepository.findOne({ where: { id } });
        if (!item) {
            throw new NotFoundException(`Item with ID ${id} not found`);
        }
        return item;
    }

    async update(id: string, updateItemDto: UpdateItemDto): Promise<Item> {
        const item = await this.findOne(id);
        Object.assign(item, updateItemDto);
        return this.itemRepository.save(item);
    }

    async remove(id: string): Promise<void> {
        const item = await this.findOne(id);
        await this.itemRepository.remove(item);
    }

    async findByProductName(productName: string): Promise<Item | null> {
        return await this.itemRepository.findOne({ where: { productName } });
    }

    async calculateRealizedPL(productName: string, sellPrice: number, sellAmount: number): Promise<number> {
        const items = await this.itemRepository.find({ where: { productName } });
        if (items.length === 0) {
            throw new NotFoundException(`No inventory found for product: ${productName}`);
        }

        let totalCost = 0;
        let totalAmount = 0;

        for (const item of items) {
            totalCost += item.price * item.amount;
            totalAmount += item.amount;
        }

        if (totalAmount === 0) {
            throw new Error(`No available stock for product: ${productName}`);
        }

        const averageCost = totalCost / totalAmount;
        const revenue = sellPrice * sellAmount;
        const costOfGoodsSold = averageCost * sellAmount;
        const realizedPL = revenue - costOfGoodsSold;

        return realizedPL;
    }
}