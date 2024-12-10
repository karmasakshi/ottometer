import { Injectable } from '@angular/core';
import {
  AuthChangeEvent,
  AuthError,
  AuthSession,
  OAuthResponse,
  SupabaseClient,
  UserResponse,
  createClient,
} from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private readonly _supabaseClient: SupabaseClient;

  constructor() { 
    this._supabaseClient = createClient(
      import.meta.env.NG_APP_SUPABASE_URL ?? '',
      import.meta.env.NG_APP_SUPABASE_KEY ?? '',
    );
  }

  public get supabaseClient(): SupabaseClient {
    return this._supabaseClient;
  }
}
