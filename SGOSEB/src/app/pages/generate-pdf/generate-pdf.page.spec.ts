import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GeneratePdfPage } from './generate-pdf.page';

describe('GeneratePdfPage', () => {
  let component: GeneratePdfPage;
  let fixture: ComponentFixture<GeneratePdfPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratePdfPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
