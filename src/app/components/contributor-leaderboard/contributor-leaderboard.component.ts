import { Component } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'jet-contributor-leaderboard',
  standalone: true,
  imports: [TranslocoModule],
  templateUrl: './contributor-leaderboard.component.html',
  styleUrl: './contributor-leaderboard.component.scss'
})
export class ContributorLeaderboardComponent {

}
