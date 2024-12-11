import { Component, inject } from '@angular/core';
import { LoggerService } from '@jet/services/logger/logger.service';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'jet-logout-page',
  standalone: true,
  imports: [TranslocoModule],
  templateUrl: './logout-page.component.html',
  styleUrl: './logout-page.component.scss',
})
export class LogoutPageComponent {
  private readonly _loggerService = inject(LoggerService);

  public constructor() {
    this._loggerService.logComponentInitialization('LogoutPageComponent');
  }
}
