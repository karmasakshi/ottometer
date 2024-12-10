import { Component, inject } from '@angular/core';
import { LoggerService } from '@jet/services/logger/logger.service';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'jet-report-page',
  standalone: true,
  imports: [TranslocoModule],
  templateUrl: './report-page.component.html',
  styleUrl: './report-page.component.scss'
})
export class ReportPageComponent {
  private readonly _loggerService = inject(LoggerService);

  public constructor(){
    this._loggerService.logComponentInitialization('ReportPageComponent')
  }
}
