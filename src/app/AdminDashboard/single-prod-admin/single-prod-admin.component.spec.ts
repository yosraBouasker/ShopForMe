import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleProdAdminComponent } from './single-prod-admin.component';

describe('SingleProdAdminComponent', () => {
  let component: SingleProdAdminComponent;
  let fixture: ComponentFixture<SingleProdAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleProdAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleProdAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
