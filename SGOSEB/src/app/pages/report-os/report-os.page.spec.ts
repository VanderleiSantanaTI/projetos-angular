import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportOsPage } from './report-os.page';

describe('ReportOsPage', () => {
  let component: ReportOsPage;
  let fixture: ComponentFixture<ReportOsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportOsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
