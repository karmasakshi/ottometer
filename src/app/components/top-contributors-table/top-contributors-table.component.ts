import { Component } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'jet-top-contributors-table',
  standalone: true,
  imports: [TranslocoModule],
  templateUrl: './top-contributors-table.component.html',
  styleUrl: './top-contributors-table.component.scss'
})
export class TopContributorsTableComponent {

}
