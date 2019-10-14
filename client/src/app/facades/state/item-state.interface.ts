import { Pagination } from 'src/app/model/pagination.interface';
import { Item } from 'src/app/model/item.model';

export interface ItemState {
  items: Item[];
  pagination: Pagination;
  criteria: string;
  loading: boolean;
}
