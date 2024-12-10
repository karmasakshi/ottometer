import { Component } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'jet-report-history-table',
  standalone: true,
  imports: [TranslocoModule],
  templateUrl: './report-history-table.component.html',
  styleUrl: './report-history-table.component.scss'
})
export class ReportHistoryTableComponent {

}
