import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdminUsersComponent } from './edit-admin-users.component';

describe('EditAdminUsersComponent', () => {
  let component: EditAdminUsersComponent;
  let fixture: ComponentFixture<EditAdminUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAdminUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAdminUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
