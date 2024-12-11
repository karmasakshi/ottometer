import { Component, inject } from '@angular/core';
import { LoggerService } from '@jet/services/logger/logger.service';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'jet-report-incorrect-meter-page',
  standalone: true,
  imports: [TranslocoModule],
  templateUrl: './report-incorrect-meter-page.component.html',
  styleUrl: './report-incorrect-meter-page.component.scss',
})
export class ReportIncorrectMeterPageComponent {
  private readonly _loggerService = inject(LoggerService);

  public constructor() {
    this._loggerService.logComponentInitialization(
      'ReportIncorrectMeterPageComponent',
    );
  }
}
