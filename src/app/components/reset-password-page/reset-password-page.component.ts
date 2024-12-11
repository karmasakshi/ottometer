import { Component, inject } from '@angular/core';
import { LoggerService } from '@jet/services/logger/logger.service';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'jet-reset-password-page',
  standalone: true,
  imports: [TranslocoModule],
  templateUrl: './reset-password-page.component.html',
  styleUrl: './reset-password-page.component.scss',
})
export class ResetPasswordPageComponent {
  private readonly _loggerService = inject(LoggerService);

  public constructor() {
    this._loggerService.logComponentInitialization(
      'ResetPasswordPageComponent',
    );
  }
}
