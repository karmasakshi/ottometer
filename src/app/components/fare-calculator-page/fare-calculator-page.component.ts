import { Component, inject } from '@angular/core';
import { LoggerService } from '@jet/services/logger/logger.service';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'jet-fare-calculator-page',
  standalone: true,
  imports: [TranslocoModule],
  templateUrl: './fare-calculator-page.component.html',
  styleUrl: './fare-calculator-page.component.scss'
})
export class FareCalculatorPageComponent {
  private readonly _loggerService = inject(LoggerService);

  public constructor(){
    this._loggerService.logComponentInitialization('FareCalculatorPageComponent')
  }
}
