import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterOsPage } from './register-os.page';

describe('RegisterOsPage', () => {
  let component: RegisterOsPage;
  let fixture: ComponentFixture<RegisterOsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterOsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
