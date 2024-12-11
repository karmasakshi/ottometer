import { inject, Injectable } from '@angular/core';
import { LoggerService } from '../logger/logger.service';
import { SupabaseService } from '../supabase/supabase.service';
import { SupabaseClient } from '@supabase/supabase-js';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private readonly _authenticationService = inject(AuthenticationService);
  private readonly _loggerService = inject(LoggerService);
  private readonly _supabaseService = inject(SupabaseService);

  private readonly _supabaseClient: SupabaseClient;

  public constructor() {
    this._supabaseClient = this._supabaseService.supabaseClient;

    this._loggerService.logServiceInitialization('ProfileService')
   }

   public updateAvatarUrl(avatarUrl: string): PromiseLike<unknown> {
    return this._supabaseClient
    .from('users')
    .update({ avatarUrl })
    .eq('id', this._authenticationService.user());
   }

   public updateUsername(username: string): PromiseLike<unknown> {
    return this._supabaseClient
    .from('users')
    .update({ username })
    .eq('id', this._authenticationService.user());
   }
}
