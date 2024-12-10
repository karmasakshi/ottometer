import { Component, inject } from '@angular/core';
import { LoggerService } from '@jet/services/logger/logger.service';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'jet-rate-card',
  standalone: true,
  imports: [TranslocoModule],
  templateUrl: './rate-card.component.html',
  styleUrl: './rate-card.component.scss'
})
export class RateCardComponent {
  private readonly _loggerService = inject(LoggerService);

  public constructor(){
    this._loggerService.logComponentInitialization('RateCardComponent')
  }
}
