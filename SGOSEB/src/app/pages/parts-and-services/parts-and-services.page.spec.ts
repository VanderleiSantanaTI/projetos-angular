import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PartsAndServicesPage } from './parts-and-services.page';

describe('PartsAndServicesPage', () => {
  let component: PartsAndServicesPage;
  let fixture: ComponentFixture<PartsAndServicesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PartsAndServicesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
