import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsLayoutComponent } from './accounts-layout.component';

describe('AccountsLayoutComponent', () => {
  let component: AccountsLayoutComponent;
  let fixture: ComponentFixture<AccountsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountsLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
