import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterEntryPage } from './register-entry.page';

describe('RegisterEntryPage', () => {
  let component: RegisterEntryPage;
  let fixture: ComponentFixture<RegisterEntryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterEntryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
