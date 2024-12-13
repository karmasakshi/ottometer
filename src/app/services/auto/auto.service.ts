import { inject, Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { LoggerService } from '../logger/logger.service';
import { SupabaseService } from '../supabase/supabase.service';
import { Auto } from '@jet/interfaces/auto.interface';
import { Plate } from '@jet/interfaces/plate.interface';

@Injectable({
  providedIn: 'root',
})
export class AutoService {
  private readonly _loggerService = inject(LoggerService);
  private readonly _supabaseService = inject(SupabaseService);

  private readonly _supabaseClient: SupabaseClient;

  public constructor() {
    this._supabaseClient = this._supabaseService.supabaseClient;

    this._loggerService.logServiceInitialization('AutoService');
  }

  public getAuto(plate: Plate): PromiseLike<unknown> {
    return this._supabaseClient
    .from('autos')
    .select('*')
    .match({
      plate_state_code: plate.state_code,
      plate_district_code: plate.district_code,
      plate_series_code: plate.series_code,
      plate_vehicle_number: plate.vehicle_number
    })
    .single();
  }
}
