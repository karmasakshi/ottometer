import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FareCalculatorPageComponent } from './fare-calculator-page.component';

describe('FareCalculatorPageComponent', () => {
  let component: FareCalculatorPageComponent;
  let fixture: ComponentFixture<FareCalculatorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FareCalculatorPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FareCalculatorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
