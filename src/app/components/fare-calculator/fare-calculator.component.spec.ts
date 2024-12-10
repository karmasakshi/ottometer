import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FareCalculatorComponent } from './fare-calculator.component';

describe('FareCalculatorComponent', () => {
  let component: FareCalculatorComponent;
  let fixture: ComponentFixture<FareCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FareCalculatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FareCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
