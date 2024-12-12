import { inject, Injectable } from '@angular/core';
import { LoggerService } from '../logger/logger.service';
import { SupabaseService } from '../supabase/supabase.service';
import { SupabaseClient } from '@supabase/supabase-js';
import { AuthenticationService } from '../authentication/authentication.service';
import { Profile } from '@jet/interfaces/profile.interface';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly _authenticationService = inject(AuthenticationService);
  private readonly _loggerService = inject(LoggerService);
  private readonly _supabaseService = inject(SupabaseService);

  private readonly _supabaseClient: SupabaseClient;

  public constructor() {
    this._supabaseClient = this._supabaseService.supabaseClient;

    this._loggerService.logServiceInitialization('ProfileService');
  }

  public selectProfile(): PromiseLike<unknown> {
    return this._supabaseClient.from('profiles').select('*');
  }

  public updateProfile(profile: Profile): PromiseLike<unknown> {
    return this._supabaseClient
      .from('users')
      .update(profile)
      .eq('id', this._authenticationService.user());
  }
}
