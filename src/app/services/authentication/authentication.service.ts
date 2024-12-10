import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { SupabaseService } from '../supabase/supabase.service';
import { AuthChangeEvent, AuthSession, User } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly _supabaseService = inject(SupabaseService);

  private readonly _user: WritableSignal<User | null>;

  public constructor() {
    this._user = signal(null);

    this._supabaseService.supabaseClient.auth.onAuthStateChange(
      (_authChangeEvent: AuthChangeEvent, authSession: AuthSession | null) => {
        this._user.set(authSession?.user ?? null);
      },
    );
  }
}
