import { Component } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'jet-logout-page',
  standalone: true,
  imports: [TranslocoModule],
  templateUrl: './logout-page.component.html',
  styleUrl: './logout-page.component.scss'
})
export class LogoutPageComponent {

}
