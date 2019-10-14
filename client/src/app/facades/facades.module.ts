import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemFacade } from './item.facade';
import { StockFacade } from './stock.facade';
import { OrderFacade } from './order.facade';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [OrderFacade, ItemFacade, StockFacade]
})
export class FacadesModule {}
