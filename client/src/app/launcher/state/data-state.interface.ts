import { OrderData } from 'src/app/dto/order-data.interface';

import { ItemData } from 'src/app/dto/item-data.interface';

import { StockData } from 'src/app/dto/stock-data.interface';

export interface DataState {
  orderData: OrderData;
  itemData: ItemData[];
  stockData: StockData;
}