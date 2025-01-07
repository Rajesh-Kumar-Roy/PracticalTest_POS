import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailsPrintComponent } from './order-details-print.component';

describe('OrderDetailsPrintComponent', () => {
  let component: OrderDetailsPrintComponent;
  let fixture: ComponentFixture<OrderDetailsPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderDetailsPrintComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderDetailsPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
