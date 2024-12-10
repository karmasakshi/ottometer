import { Component } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'jet-autos-table',
  standalone: true,
  imports: [TranslocoModule],
  templateUrl: './autos-table.component.html',
  styleUrl: './autos-table.component.scss'
})
export class AutosTableComponent {

}
