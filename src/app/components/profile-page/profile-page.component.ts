import { Component, inject } from '@angular/core';
import { LoggerService } from '@jet/services/logger/logger.service';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'jet-profile-page',
  standalone: true,
  imports: [TranslocoModule],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent {
  private readonly _loggerService = inject(LoggerService);

  public constructor(){
    this._loggerService.logComponentInitialization('ProfilePageComponent')
  }
}
