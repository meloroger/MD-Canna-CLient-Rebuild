import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestButtonsComponent } from './test-buttons.component';

describe('TestButtonsComponent', () => {
  let component: TestButtonsComponent;
  let fixture: ComponentFixture<TestButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
