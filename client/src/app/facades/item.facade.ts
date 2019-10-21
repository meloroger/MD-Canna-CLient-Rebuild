import { Injectable } from '@angular/core';
import { ItemState } from './state/item-state.interface';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { ItemService } from '../services/item.service';
import { Pagination } from '../model/pagination.interface';
import { Item } from '../model/item.interface';
import { ItemRequest } from '../dto/item-request.interface';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class ItemFacade {
  private state: ItemState = {
    items: [],
    selectedItem: null,
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
  selectedItem$ = this.state$.pipe(
    map(state => state.selectedItem),
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
    this.selectedItem$,
    this.pagination$,
    this.criteria$,
    this.loading$
  ).pipe(
    map(([items, selectedItem, pagination, criteria, loading]) => {
      return { items, selectedItem, pagination, criteria, loading };
    })
  );

  constructor(
    private readonly itemService: ItemService,
    private snackBar: MatSnackBar
  ) {
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

  selectItem(item: Item): void {
    this.updateState({
      ...this.state,
      selectedItem: item,
      loading: false
    });
  }

  createItem(itemRequest: ItemRequest) {
    return this.itemService.createItem(itemRequest).subscribe(
      itm => {
        this.openSnackBar('Item Created!', 'success');
        this.updateState({
          ...this.state,
          items: [...this.state.items, itm],
          loading: false
        });
      },
      () => {
        this.setLoading(false);
        this.openSnackBar('Oops...something went wrong...', 'fail');
      }
    );
  }

  deleteItem(id: string) {
    return this.itemService.deleteItem(id).subscribe(
      item => {
        this.openSnackBar('Item Deleted!', 'success');
        this.updateState({
          ...this.state,
          items: this.state.items.filter(i => i.id !== id),
          loading: false
        });
      },
      () => {
        this.setLoading(false);
        this.openSnackBar('Oops...something went wrong...', 'fail');
      }
    );
  }

  updateItem(itemRequest: ItemRequest) {
    return this.itemService.updateItem(itemRequest).subscribe(
      itm => {
        this.openSnackBar('Item Updated!', 'success');
        this.updateState({
          ...this.state,
          items: this.state.items
            .filter(i => i.id !== itemRequest.id)
            .concat(itm),
          loading: false
        });
      },
      () => {
        this.setLoading(false);
        this.openSnackBar('Oops...something went wrong...', 'fail');
      }
    );
  }

  setLoading(loading: boolean): void {
    this.updateState({
      ...this.state,
      loading
    });
  }

  private openSnackBar(message: string, css: string): void {
    this.snackBar.open(message, 'Ok', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: css
    });
  }
}
