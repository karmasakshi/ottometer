import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportCorrectMeterPageComponent } from './report-correct-meter-page.component';

describe('ReportCorrectMeterPageComponent', () => {
  let component: ReportCorrectMeterPageComponent;
  let fixture: ComponentFixture<ReportCorrectMeterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportCorrectMeterPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportCorrectMeterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
