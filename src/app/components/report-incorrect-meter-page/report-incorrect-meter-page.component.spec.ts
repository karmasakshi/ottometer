import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportIncorrectMeterPageComponent } from './report-incorrect-meter-page.component';

describe('ReportIncorrectMeterPageComponent', () => {
  let component: ReportIncorrectMeterPageComponent;
  let fixture: ComponentFixture<ReportIncorrectMeterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportIncorrectMeterPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportIncorrectMeterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
