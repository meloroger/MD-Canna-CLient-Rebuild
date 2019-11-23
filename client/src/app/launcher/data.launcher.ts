import { Injectable } from "@angular/core";
import io from "socket.io-client";
import { DataState } from "./state/data-state.interface";
import { BehaviorSubject, Observable, combineLatest } from "rxjs";
import { distinctUntilChanged, map } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable()
export class DataLauncher {
  private socket: io;
  private HOST: string;

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
    if (environment.production === true) {
      this.socket = io(`${environment.apiUrl}:${environment.port}/data`);
    } else {
      this.socket = io(`http://localhost:${environment.port}/data`);
    }

    this.dataReceiver().subscribe(data => {
      this.updateState({
        ...this.state,
        orderData: data.orderData,
        itemData: data.itemData,
        stockData: data.stockData
      });
    });
  }

  private dataReceiver(): Observable<DataState> {
    const liveFeed: Observable<DataState> = new Observable(observer => {
      this.socket.on("data-stream", data => {
        observer.next(data);
      });
    });

    console.log(this.state);
    return liveFeed;
  }

  private updateState(state: DataState): void {
    this.store.next((this.state = state));
  }
}
