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

  public getProfile(): PromiseLike<unknown> {
    return this._supabaseClient.from('profiles').select('*')
    .eq('id', this._authenticationService.user()?.id)
    .single();
  }

  public updateProfile(partialProfile: Partial<Profile>): PromiseLike<unknown> {
    return this._supabaseClient
      .from('profiles')
      .upsert(partialProfile);
  }

  downLoadImage(path: string) {
    return this._supabaseClient.storage.from('avatars').download(path)
  }

  uploadAvatar(filePath: string, file: File) {
    return this._supabaseClient.storage.from('avatars').upload(filePath, file)
  }
}
