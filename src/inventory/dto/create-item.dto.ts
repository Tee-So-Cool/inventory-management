export class CreateItemDto {
    productName: string;
    status: 'BUY' | 'SELL';
    price: number;
    amount: number;
    at: Date;
}
