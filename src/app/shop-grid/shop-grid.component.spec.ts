import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopGridComponent } from './shop-grid.component';

describe('ShopGridComponent', () => {
  let component: ShopGridComponent;
  let fixture: ComponentFixture<ShopGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
