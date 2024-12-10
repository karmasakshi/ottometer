import { inject, Injectable } from '@angular/core';
import { LoggerService } from '../logger/logger.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private readonly _loggerService = inject(LoggerService);

  public constructor() { 
    this._loggerService.logServiceInitialization('ReportService')
  }
}
