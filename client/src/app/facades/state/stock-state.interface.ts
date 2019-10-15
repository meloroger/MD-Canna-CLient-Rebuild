import { StockMovement } from 'src/app/model/stock-movement.interface';
import { Pagination } from 'src/app/model/pagination.interface';

export interface StockState {
  stockMovements: StockMovement[];
  selectedStock: StockMovement;
  pagination: Pagination;
  criteria: string;
  loading: boolean;
}
