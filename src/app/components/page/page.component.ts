import { Component, inject } from '@angular/core';
import { LoggerService } from '@jet/services/logger/logger.service';

@Component({
  selector: 'jet-page',
  standalone: true,
  imports: [],
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss'
})
export class PageComponent {
  private readonly _loggerService = inject(LoggerService);

  public constructor(){
    this._loggerService.logComponentInitialization('PageComponent');
  }
}
