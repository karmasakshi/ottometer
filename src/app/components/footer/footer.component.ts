import { Component, inject } from '@angular/core';
import { LoggerService } from '@jet/services/logger/logger.service';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'jet-footer',
  standalone: true,
  imports: [TranslocoModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  private readonly _loggerService = inject(LoggerService);

    currentYear: number = new Date().getFullYear();

  public constructor() {
    this._loggerService.logComponentInitialization('FooterComponent');
  }
}
