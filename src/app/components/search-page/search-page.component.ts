import { Component, inject } from '@angular/core';
import { LoggerService } from '@jet/services/logger/logger.service';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'jet-search-page',
  standalone: true,
  imports: [TranslocoModule],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss'
})
export class SearchPageComponent {
  private readonly _loggerService = inject(LoggerService);

  public constructor(){
    this._loggerService.logComponentInitialization('SearchPageComponent')
  }
}
