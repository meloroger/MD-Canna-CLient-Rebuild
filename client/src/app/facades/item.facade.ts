import { Injectable } from '@angular/core';
import { ItemState } from './state/item-state.interface';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { ItemService } from '../services/item.service';
import { Pagination } from '../model/pagination.interface';
import { Item } from '../model/item.model';

@Injectable()
export class ItemFacade {
  private state: ItemState = {
    items: [],
    criteria: 'Enter Search...',
    pagination: {
      currentPage: 0,
      selectedSize: 5,
      pageSizes: [5, 10, 20, 50]
    },
    loading: false
  };

  private store = new BehaviorSubject<ItemState>(this.state);
  private state$ = this.store.asObservable();

  items$ = this.state$.pipe(
    map(state => state.items),
    distinctUntilChanged()
  );
  criteria$ = this.state$.pipe(
    map(state => state.criteria),
    distinctUntilChanged()
  );
  pagination$ = this.state$.pipe(
    map(state => state.pagination),
    distinctUntilChanged()
  );
  loading$ = this.state$.pipe(map(state => state.loading));

  vm$: Observable<ItemState> = combineLatest(
    this.items$,
    this.pagination$,
    this.criteria$,
    this.loading$
  ).pipe(
    map(([items, pagination, criteria, loading]) => {
      return { items, pagination, criteria, loading };
    })
  );

  constructor(private itemService: ItemService) {
    combineLatest(this.criteria$, this.pagination$)
      .pipe(
        switchMap(([criteria, pagination]) => {
          return this.findAllItems(criteria, pagination);
        })
      )
      .subscribe(items => {
        this.updateState({ ...this.state, items, loading: false });
      });
  }

  getStateSnapshot(): ItemState {
    return { ...this.state, pagination: { ...this.state.pagination } };
  }

  private updateState(state: ItemState): void {
    this.store.next((this.state = state));
  }

  private findAllItems(
    criteria: string,
    pagination: Pagination
  ): Observable<Item[]> {
    return this.itemService.fetchAllItems();
  }

  createItem(item: Item) {
    return this.itemService.createItem(item).subscribe(itm => {
      this.updateState({
        ...this.state,
        items: [...this.state.items, itm],
        loading: false
      });
    });
  }

  deleteItem(id: string) {
    return this.itemService.deleteItem(id).subscribe(item => {
      this.updateState({
        ...this.state,
        items: this.state.items.filter(i => i.id !== id),
        loading: false
      });
    });
  }

  updateItem(item: Item) {
    return this.itemService.updateItem(item).subscribe(itm =>
      this.updateState({
        ...this.state,
        items: this.state.items.filter(i => i.id !== item.id).concat(item),
        loading: false
      })
    );
  }
}
