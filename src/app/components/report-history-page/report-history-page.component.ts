import { Component, inject, OnInit } from '@angular/core';
import { LoggerService } from '@jet/services/logger/logger.service';
import { ReportService } from '@jet/services/report/report.service';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'jet-report-history-page',
  standalone: true,
  imports: [TranslocoModule],
  templateUrl: './report-history-page.component.html',
  styleUrl: './report-history-page.component.scss',
})
export class ReportHistoryPageComponent implements OnInit {
  private readonly _loggerService = inject(LoggerService);
  private readonly _reportService = inject(ReportService);

  public constructor() {
    this._loggerService.logComponentInitialization(
      'ReportHistoryPageComponent',
    );
  }

  public ngOnInit():void {
    this.selectReports();
  }

  public selectReports():void {
    this._reportService.selectReports();
  }
}
