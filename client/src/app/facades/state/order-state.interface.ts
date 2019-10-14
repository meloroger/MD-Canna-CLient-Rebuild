import { Order } from 'src/app/model/order.model';
import { Pagination } from 'src/app/model/pagination.interface';

export interface OrderState {
  orders: Order[];
  selectedOrder: Order;
  pagination: Pagination;
  criteria: string;
  loading: boolean;
}
