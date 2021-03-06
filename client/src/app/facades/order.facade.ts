import { Injectable, Injector } from '@angular/core';
import { OrderState } from './state/order-state.interface';
import { BehaviorSubject, Observable, combineLatest, Subscription } from 'rxjs';
import { distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { OrderService } from 'src/app/services/order.service';
import { Pagination } from 'src/app/model/pagination.interface';
import { Order } from 'src/app/model/order.interface';
import { OrderRequest } from '../dto/order-request.interface';
import { StockFacade } from './stock.facade';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class OrderFacade {
  private state: OrderState = {
    orders: [],
    selectedOrder: null,
    criteria: 'Enter Search...',
    pagination: {
      currentPage: 0,
      selectedSize: 5,
      pageSizes: [5, 10, 20, 50]
    },
    loading: false
  };

  private store = new BehaviorSubject<OrderState>(this.state);
  private state$ = this.store.asObservable();

  orders$ = this.state$.pipe(
    map(state => state.orders),
    distinctUntilChanged()
  );
  selectedOrder$ = this.state$.pipe(
    map(state => state.selectedOrder),
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

  vm$: Observable<OrderState> = combineLatest(
    this.orders$,
    this.selectedOrder$,
    this.pagination$,
    this.criteria$,
    this.loading$
  ).pipe(
    map(([orders, selectedOrder, pagination, criteria, loading]) => {
      return { orders, selectedOrder, pagination, criteria, loading };
    })
  );

  constructor(
    private readonly orderService: OrderService,
    private readonly stockFacade: StockFacade,
    private readonly snackBar: MatSnackBar
  ) {
    combineLatest(this.criteria$, this.pagination$)
      .pipe(
        switchMap(([criteria, pagination]) => {
          return this.findAllOrders(criteria, pagination);
        })
      )
      .subscribe(orders => {
        this.updateState({ ...this.state, orders, loading: false });
      });
  }

  getStateSnapshot(): OrderState {
    return { ...this.state, pagination: { ...this.state.pagination } };
  }

  private updateState(state: OrderState): void {
    this.store.next((this.state = state));
  }

  private findAllOrders(
    criteria: string,
    pagination: Pagination
  ): Observable<Order[]> {
    return this.orderService.getOrders();
  }

  selectOrder(order: Order): void {
    this.updateState({
      ...this.state,
      selectedOrder: order,
      loading: false
    });
    console.log(this.state.selectedOrder);
  }

  createOrder(orderRequest: Order): void {
    this.orderService.createOrder(orderRequest).subscribe(
      ordr => {
        this.openSnackBar('Order Created!', 'success');
        this.stockFacade.refreshState();
        this.updateState({
          ...this.state,
          orders: [...this.state.orders, ordr],
          loading: false
        });
      },
      () => {
        this.setLoading(false);
        this.openSnackBar('Oops...something went wrong...', 'fail');
      }
    );
  }

  deleteOrder(id: string): void {
    this.orderService.deleteOrder(id).subscribe(
      order => {
        this.openSnackBar('Order Deleted!', 'success');
        this.updateState({
          ...this.state,
          orders: this.state.orders.filter(o => o.id !== id),
          loading: false
        });
      },
      () => {
        this.setLoading(false);
        this.openSnackBar('Oops...something went wrong...', 'fail');
      }
    );
  }

  updateOrder(orderRequest: OrderRequest): void {
    orderRequest = {
      ...orderRequest,
      stockMovements: this.state.selectedOrder.stockMovements
    };
    this.orderService.updateOrder(orderRequest).subscribe(
      ordr => {
        this.openSnackBar('Order Updated!', 'success');
        this.updateState({
          ...this.state,
          orders: this.state.orders
            .filter(o => o.id !== orderRequest.id)
            .concat(ordr),
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
