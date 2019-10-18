import { StockMovement } from '../model/stock-movement.interface';

export interface OrderRequest {
  id?: string;
  itemId: string;
  quantity: number;
  userId: string;
  complete: boolean;
  stockMovements?: StockMovement[];
}
