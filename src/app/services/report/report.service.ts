import { inject, Injectable } from '@angular/core';
import { LoggerService } from '../logger/logger.service';
import { SupabaseService } from '../supabase/supabase.service';
import { SupabaseClient } from '@supabase/supabase-js';
import { Report } from '@jet/interfaces/report.interface';
import { NewReport } from '@jet/interfaces/new-report.interface';

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

  public insertReport(newReport: NewReport): PromiseLike<unknown> {
    return this._supabaseClient.from('reports').insert([newReport]);
  }

  public getReport(id: Report['id']): PromiseLike<unknown> {
    return this._supabaseClient
      .from('reports')
      .select('*')
      .eq('id', id)
      .single();
  }

  public getReports(
    pageNumber: number = 1,
    pageSize: number = 10,
    type?: Report['type'] | null,
    autoId?: Report['auto_id'],
  ): PromiseLike<unknown> {
    return this._supabaseClient.rpc('select_reports', {
      x_page_number: pageNumber,
      x_page_size: pageSize,
      x_type: type,
      x_auto_id: autoId,
    });
  }
}
