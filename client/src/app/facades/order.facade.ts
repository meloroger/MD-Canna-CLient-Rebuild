import { Injectable } from '@angular/core';
import { OrderState } from './state/order-state.interface';
import { BehaviorSubject, Observable, combineLatest, Subscription } from 'rxjs';
import { distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { OrderService } from 'src/app/services/order.service';
import { Pagination } from 'src/app/model/pagination.interface';
import { Order } from 'src/app/model/order.interface';

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

  constructor(private orderService: OrderService) {
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

  createOrder(order: Order): void {
    this.orderService.createOrder(order).subscribe(ordr =>
      this.updateState({
        ...this.state,
        orders: [...this.state.orders, ordr],
        loading: false
      })
    );
  }

  deleteOrder(id: string): void {
    this.orderService.deleteOrder(id).subscribe(order => {
      this.updateState({
        ...this.state,
        orders: this.state.orders.filter(o => o.id !== id),
        loading: false
      });
    });
  }

  updateOrder(order: Order): void {
    this.orderService.updateOrder(order).subscribe(ordr => {
      this.updateState({
        ...this.state,
        orders: this.state.orders.filter(o => o.id !== order.id).concat(order),
        loading: false
      });
    });
  }
}
