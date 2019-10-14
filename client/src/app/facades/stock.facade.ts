import { Injectable } from '@angular/core';
import { StockState } from './state/stock-state.interface';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { StockService } from 'src/app/services/stock.service';
import { StockMovement } from 'src/app/model/stock-movement.model';
import { Pagination } from 'src/app/model/pagination.interface';

@Injectable()
export class StockFacade {
  private state: StockState = {
    stockMovements: [],
    selectedStock: null,
    criteria: 'Enter Search...',
    pagination: {
      currentPage: 0,
      selectedSize: 5,
      pageSizes: [5, 10, 20, 50]
    },
    loading: false
  };

  private store = new BehaviorSubject<StockState>(this.state);
  private state$ = this.store.asObservable();

  stockMovements$ = this.state$.pipe(
    map(state => state.stockMovements),
    distinctUntilChanged()
  );
  selectedStock$ = this.state$.pipe(
    map(state => state.selectedStock),
    distinctUntilChanged()
  );
  criteria$ = this.state$.pipe(
    map(stock => this.state.criteria),
    distinctUntilChanged()
  );
  pagination$ = this.state$.pipe(
    map(state => this.state.pagination),
    distinctUntilChanged()
  );
  loading$ = this.state$.pipe(map(state => state.loading));

  vm$: Observable<StockState> = combineLatest(
    this.stockMovements$,
    this.selectedStock$,
    this.pagination$,
    this.criteria$,
    this.loading$
  ).pipe(
    map(([stockMovements, selectedStock, pagination, criteria, loading]) => {
      return { stockMovements, selectedStock, pagination, criteria, loading };
    })
  );

  constructor(private stockService: StockService) {
    combineLatest(this.criteria$, this.pagination$)
      .pipe(
        switchMap(([criteria, pagination]) => {
          return this.findAllStockMovements(criteria, pagination);
        })
      )
      .subscribe(stockMovements => {
        this.updateState({ ...this.state, stockMovements, loading: false });
      });
  }

  getStateSnapShot(): StockState {
    return { ...this.state, pagination: { ...this.state.pagination } };
  }

  private updateState(state: StockState): void {
    this.store.next((this.state = state));
  }

  private findAllStockMovements(
    criteria: string,
    pagination: Pagination
  ): Observable<StockMovement[]> {
    return this.stockService.fetchAllStockMovements();
  }

  selectStockMovement(stockMovement: StockMovement): void {
    this.updateState({
      ...this.state,
      selectedStock: stockMovement,
      loading: false
    });
  }

  createStockMovement(stockMovement: StockMovement): void {
    this.stockService.createStockMovement(stockMovement).subscribe(stock =>
      this.updateState({
        ...this.state,
        stockMovements: [...this.state.stockMovements, stock],
        loading: false
      })
    );
  }

  removeStockMovement(id: string): void {
    this.stockService.deleteStockMovement(id).subscribe(stock =>
      this.updateState({
        ...this.state,
        stockMovements: this.state.stockMovements.filter(s => s.id !== id),
        loading: false
      })
    );
  }

  updateStockMovement(stockMovement: StockMovement): void {
    this.stockService.updateStockMovement(stockMovement).subscribe(stock =>
      this.updateState({
        ...this.state,
        stockMovements: this.state.stockMovements
          .filter(s => s.id !== stockMovement.id)
          .concat(stock),
        loading: false
      })
    );
  }
}
