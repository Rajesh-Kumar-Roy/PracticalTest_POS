import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosHeaderComponent } from './pos-header.component';

describe('PosHeaderComponent', () => {
  let component: PosHeaderComponent;
  let fixture: ComponentFixture<PosHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PosHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PosHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
