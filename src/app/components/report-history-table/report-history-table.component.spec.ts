import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportHistoryTableComponent } from './report-history-table.component';

describe('ReportHistoryTableComponent', () => {
  let component: ReportHistoryTableComponent;
  let fixture: ComponentFixture<ReportHistoryTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportHistoryTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportHistoryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
