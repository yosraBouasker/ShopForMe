import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesAdminComponent } from './messages-admin.component';

describe('MessagesAdminComponent', () => {
  let component: MessagesAdminComponent;
  let fixture: ComponentFixture<MessagesAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessagesAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
