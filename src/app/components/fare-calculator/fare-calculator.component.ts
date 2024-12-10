import { Component } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'jet-fare-calculator',
  standalone: true,
  imports: [TranslocoModule],
  templateUrl: './fare-calculator.component.html',
  styleUrl: './fare-calculator.component.scss'
})
export class FareCalculatorComponent {

}
