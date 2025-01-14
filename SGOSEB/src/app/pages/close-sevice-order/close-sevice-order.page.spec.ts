import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CloseSeviceOrderPage } from './close-sevice-order.page';

describe('CloseSeviceOrderPage', () => {
  let component: CloseSeviceOrderPage;
  let fixture: ComponentFixture<CloseSeviceOrderPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseSeviceOrderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
