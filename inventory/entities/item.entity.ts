import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Item {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    productName: string;

    @Column()
    status: 'BUY' | 'SELL';

    @Column('float')
    price: number;

    @Column('int')
    amount: number;

    @Column()
    at: Date;
}