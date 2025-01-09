import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterExitPage } from './register-exit.page';

describe('RegisterExitPage', () => {
  let component: RegisterExitPage;
  let fixture: ComponentFixture<RegisterExitPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterExitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
