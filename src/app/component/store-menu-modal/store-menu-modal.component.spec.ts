import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreMenuModalComponent } from './store-menu-modal.component';

describe('StoreMenuModalComponent', () => {
  let component: StoreMenuModalComponent;
  let fixture: ComponentFixture<StoreMenuModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreMenuModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreMenuModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
