import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosProductListComponent } from './pos-product-list.component';

describe('PosProductListComponent', () => {
  let component: PosProductListComponent;
  let fixture: ComponentFixture<PosProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PosProductListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PosProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
