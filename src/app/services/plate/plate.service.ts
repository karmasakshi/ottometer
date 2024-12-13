import {
  inject,
  Injectable,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { LoggerService } from '../logger/logger.service';
import { Plate } from '@jet/interfaces/plate.interface';

@Injectable({
  providedIn: 'root',
})
export class PlateService {
  private readonly _loggerService = inject(LoggerService);
  private readonly _plate: WritableSignal<Plate | undefined>;

  public constructor() {
    this._plate = signal(undefined);
    this._loggerService.logServiceInitialization('PlateService');
  }

  public get plate(): Signal<Plate | undefined> {
    return this._plate.asReadonly();
  }

  public setPlate(plate: Plate): void {
    this._plate.set({ ...plate });
  }
}
