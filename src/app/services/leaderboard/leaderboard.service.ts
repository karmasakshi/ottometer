import { inject, Injectable } from '@angular/core';
import { LoggerService } from '../logger/logger.service';
import { SupabaseService } from '../supabase/supabase.service';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class LeaderboardService {
  private readonly _loggerService = inject(LoggerService);
  private readonly _supabaseService = inject(SupabaseService);

  private readonly _supabaseClient: SupabaseClient;

  public constructor() {
    this._supabaseClient = this._supabaseService.supabaseClient;

    this._loggerService.logServiceInitialization('LeaderboardService');
  }

  public selectLeaderboardTopReporters(): PromiseLike<unknown> {
    return this._supabaseClient.rpc('profiles');
  }

  public selectLeaderboardTopFairAutos(): PromiseLike<unknown> {
    return this._supabaseClient.rpc('autos_correct');
  }

  public selectLeaderboardTopUnfairAutos(): PromiseLike<unknown> {
    return this._supabaseClient.rpc('autos_incorrect');
  }
}
