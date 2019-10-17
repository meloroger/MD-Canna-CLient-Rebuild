import { Order } from './order.interface';

export interface StockMovement {
  id?: string;
  itemId: string;
  quantity: number;
  orders?: Order[];
}
