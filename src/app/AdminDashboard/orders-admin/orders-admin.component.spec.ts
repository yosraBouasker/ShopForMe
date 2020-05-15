import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersAdminComponent } from './orders-admin.component';

describe('OrdersAdminComponent', () => {
  let component: OrdersAdminComponent;
  let fixture: ComponentFixture<OrdersAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
