import { Component } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'jet-report-page',
  standalone: true,
  imports: [TranslocoModule],
  templateUrl: './report-page.component.html',
  styleUrl: './report-page.component.scss'
})
export class ReportPageComponent {

}
