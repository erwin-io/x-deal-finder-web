import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordAdminUserComponent } from './change-password-admin-user.component';

describe('ChangePasswordAdminUserComponent', () => {
  let component: ChangePasswordAdminUserComponent;
  let fixture: ComponentFixture<ChangePasswordAdminUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangePasswordAdminUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangePasswordAdminUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
