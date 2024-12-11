import { Component, inject } from '@angular/core';
import { LoggerService } from '@jet/services/logger/logger.service';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'jet-auto-leaderboard',
  standalone: true,
  imports: [TranslocoModule],
  templateUrl: './auto-leaderboard.component.html',
  styleUrl: './auto-leaderboard.component.scss',
})
export class AutoLeaderboardComponent {
  private readonly _loggerService = inject(LoggerService);

  public constructor() {
    this._loggerService.logComponentInitialization('AutoLeaderboardComponent');
  }
}
