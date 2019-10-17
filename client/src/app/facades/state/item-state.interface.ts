import { Pagination } from 'src/app/model/pagination.interface';
import { Item } from 'src/app/model/item.interface';

export interface ItemState {
  items: Item[];
  selectedItem: Item;
  pagination: Pagination;
  criteria: string;
  loading: boolean;
}
