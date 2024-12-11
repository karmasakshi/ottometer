import { inject, Injectable } from '@angular/core';
import { LoggerService } from '../logger/logger.service';
import { SupabaseService } from '../supabase/supabase.service';
import { SupabaseClient } from '@supabase/supabase-js';
import { Report } from '@jet/interfaces/report.interface';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private readonly _loggerService = inject(LoggerService);
  private readonly _supabaseService = inject(SupabaseService);

  private readonly _supabaseClient: SupabaseClient;

  public constructor() {
    this._supabaseClient = this._supabaseService.supabaseClient;

    this._loggerService.logServiceInitialization('ReportService');
  }

  public deleteReport(id: Report['id']): PromiseLike<unknown> {
    return this._supabaseClient.from('reports').delete().eq('id', id);
  }

  public getReport(id: Report['id']): PromiseLike<unknown> {
    return this._supabaseClient.from('reports').select('*').eq('id', id);
  }

  public getReports(
    pageNumber: number,
    pageSize: number,
  ): PromiseLike<unknown> {
    return this._supabaseClient.rpc('fetch_user_reports', {
      pageNumber,
      pageSize,
    });
  }

  public submitReport(report: Report): PromiseLike<unknown> {
    return this._supabaseClient.rpc('insert_report', { report });
  }
}
