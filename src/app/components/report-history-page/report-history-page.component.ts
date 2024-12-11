import { Component, inject } from '@angular/core';
import { LoggerService } from '@jet/services/logger/logger.service';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'jet-report-history-page',
  standalone: true,
  imports: [TranslocoModule],
  templateUrl: './report-history-page.component.html',
  styleUrl: './report-history-page.component.scss',
})
export class ReportHistoryPageComponent {
  private readonly _loggerService = inject(LoggerService);

  public constructor() {
    this._loggerService.logComponentInitialization(
      'ReportHistoryPageComponent',
    );
  }
}
