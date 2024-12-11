import { Component, inject } from '@angular/core';
import { LoggerService } from '@jet/services/logger/logger.service';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'jet-home-page',
  standalone: true,
  imports: [TranslocoModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  private readonly _loggerService = inject(LoggerService);

  public constructor() {
    this._loggerService.logComponentInitialization('HomePageComponent');
  }
}
