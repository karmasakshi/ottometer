import { Component, inject } from '@angular/core';
import { LoggerService } from '@jet/services/logger/logger.service';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'jet-report-correct-meter-page',
  standalone: true,
  imports: [TranslocoModule],
  templateUrl: './report-correct-meter-page.component.html',
  styleUrl: './report-correct-meter-page.component.scss'
})
export class ReportCorrectMeterPageComponent {
  private readonly _loggerService = inject(LoggerService);

  public constructor(){
    this._loggerService.logComponentInitialization('ReportCorrectMeterPageComponent');
  }
}
