import { Component, inject } from '@angular/core';
import { LoggerService } from '@jet/services/logger/logger.service';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'jet-contributor-leaderboard',
  standalone: true,
  imports: [TranslocoModule],
  templateUrl: './contributor-leaderboard.component.html',
  styleUrl: './contributor-leaderboard.component.scss',
})
export class ContributorLeaderboardComponent {
  private readonly _loggerService = inject(LoggerService);

  public constructor() {
    this._loggerService.logComponentInitialization(
      'ContributorLeaderboardComponent',
    );
  }
}
