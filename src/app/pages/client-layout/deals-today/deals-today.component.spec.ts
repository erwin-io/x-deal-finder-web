import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealsTodayComponent } from './deals-today.component';

describe('DealsTodayComponent', () => {
  let component: DealsTodayComponent;
  let fixture: ComponentFixture<DealsTodayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealsTodayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DealsTodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
