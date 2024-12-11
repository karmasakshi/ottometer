import { inject, Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { LoggerService } from '../logger/logger.service';
import { SupabaseService } from '../supabase/supabase.service';
import { Auto } from '@jet/interfaces/auto.interface';

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

  public getAuto(plateNumber: Auto['plateNumber']): PromiseLike<unknown> {
    return this._supabaseClient.rpc('search_autos', {
      plate_query: plateNumber,
    });
  }
}
