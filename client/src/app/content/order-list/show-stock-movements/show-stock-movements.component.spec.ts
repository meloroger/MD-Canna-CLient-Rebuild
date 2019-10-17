import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowStockMovementsComponent } from './show-stock-movements.component';

describe('ShowStockMovementsComponent', () => {
  let component: ShowStockMovementsComponent;
  let fixture: ComponentFixture<ShowStockMovementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowStockMovementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowStockMovementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
