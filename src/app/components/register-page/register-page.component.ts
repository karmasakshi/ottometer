import { Component, inject } from '@angular/core';
import { LoggerService } from '@jet/services/logger/logger.service';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'jet-register-page',
  standalone: true,
  imports: [TranslocoModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
})
export class RegisterPageComponent {
  private readonly _loggerService = inject(LoggerService);

  public constructor() {
    this._loggerService.logComponentInitialization('RegisterPageComponent');
  }
}
