export class UpdateItemDto {
    productName?: string;
    status?: 'BUY' | 'SELL';
    price?: number;
    amount?: number;
    at?: Date;
}