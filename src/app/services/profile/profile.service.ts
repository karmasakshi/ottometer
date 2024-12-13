import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
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
  private readonly _profile: WritableSignal<Profile|undefined>;

  public constructor() {
    this._profile = signal(undefined);
    this._supabaseClient = this._supabaseService.supabaseClient;
    this.getProfile();

    this._loggerService.logServiceInitialization('ProfileService');
  }

  public get profile():Signal<Profile|undefined>{
    return this._profile.asReadonly()
  }

  private getProfile(): void {
    this._supabaseClient.from('profiles').select('*')
    .eq('id', this._authenticationService.user()?.id)
    .single().then(({data, error})=>{
      this._profile.set(data);
    })
  }

  public updateProfile(partialProfile: Partial<Profile>): PromiseLike<unknown> {
    return this._supabaseClient
      .from('profiles')
      .update(partialProfile)
      .eq('id', this._authenticationService.user()?.id);
  }

  downLoadImage(path: string) {
    return this._supabaseClient.storage.from('avatars').download(path)
  }

  uploadAvatarSB(filePath: string, file: File) {
    return this._supabaseClient.storage.from('avatars').upload(filePath, file)
  }

  async uploadAvatar(file: File): Promise<string> {

    const fileExt = file.name.split('.').pop();
    const filePath = `${this._authenticationService.user()?.id}/avatar.${fileExt}`;
  
    try {
      await this._supabaseClient.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });
  
      const { data } = this._supabaseClient.storage
        .from('avatars')
        .getPublicUrl(filePath);
  
      if (!data || !data.publicUrl) {
        throw new Error('Failed to retrieve public URL');
      }
  
      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading avatar:', error);
      throw error;
    }
  }
}
