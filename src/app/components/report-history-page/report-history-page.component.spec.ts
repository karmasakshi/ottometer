import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportHistoryPageComponent } from './report-history-page.component';

describe('ReportHistoryPageComponent', () => {
  let component: ReportHistoryPageComponent;
  let fixture: ComponentFixture<ReportHistoryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportHistoryPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportHistoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
