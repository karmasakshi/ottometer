import { inject, Injectable } from '@angular/core';
import { LoggerService } from '../logger/logger.service';
import { SupabaseService } from '../supabase/supabase.service';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class LeaderboardsService {
  private readonly _loggerService = inject(LoggerService);
  private readonly _supabaseService = inject(SupabaseService);

  private readonly _supabaseClient: SupabaseClient;

  public constructor() {
    this._supabaseClient = this._supabaseService.supabaseClient;

    this._loggerService.logServiceInitialization('LeaderboardsService');
  }

  public getLeaderboardTopReporters(): PromiseLike<unknown> {
    return this._supabaseClient
      .from('leaderboard_top_reporters')
      .select('*')
      .order('total_reports_count', { ascending: false });
  }

  public getLeaderboardTopFairAutos(): PromiseLike<unknown> {
    return this._supabaseClient
      .from('leaderboard_top_fair_autos')
      .select('*')
      .order('meter_correct_reports_count', { ascending: false });
  }

  public getLeaderboardTopUnfairAutos(): PromiseLike<unknown> {
    return this._supabaseClient
      .from('leaderboard_top_unfair_autos')
      .select('*')
      .order('meter_incorrect_reports_count', { ascending: false });
  }
}
