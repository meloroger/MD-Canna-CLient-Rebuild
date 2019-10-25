import { Injectable } from '@angular/core';
import io from 'socket.io-client';
import { DataState } from './state/data-state.interface';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

@Injectable()
export class DataLauncher {
  private socket: io;

  private state: DataState = {
    orderData: null,
    itemData: [],
    stockData: null
  };

  private store = new BehaviorSubject<DataState>(this.state);
  private state$ = this.store.asObservable();

  orderData$ = this.state$.pipe(
    map(state => state.orderData),
    distinctUntilChanged()
  );
  itemData$ = this.state$.pipe(
    map(state => state.itemData),
    distinctUntilChanged()
  );
  stockData$ = this.state$.pipe(
    map(state => state.stockData),
    distinctUntilChanged()
  );

  vm$: Observable<DataState> = combineLatest(
    this.orderData$,
    this.itemData$,
    this.stockData$
  ).pipe(
    map(([orderData, itemData, stockData]) => {
      return { orderData, itemData, stockData };
    })
  );

  constructor() {
    this.socket = io('http://localhost:3000/data');
    this.dataReceiver();
  }

  private dataReceiver(): void {
    this.socket.on('data-stream', data => {
      console.log(data);
      this.updateState({ ...data });
      console.log(this.state);
    });
  }

  private updateState(state: DataState): void {
    this.store.next((this.state = state));
  }
}
