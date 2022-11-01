import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientStoresComponent } from './client-stores.component';

describe('ClientStoresComponent', () => {
  let component: ClientStoresComponent;
  let fixture: ComponentFixture<ClientStoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientStoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientStoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
