import {
  inject,
  Injectable,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { SupabaseService } from '../supabase/supabase.service';
import {
  AuthChangeEvent,
  AuthError,
  AuthResponse,
  AuthSession,
  AuthTokenResponsePassword,
  OAuthResponse,
  SupabaseClient,
  UserResponse,
} from '@supabase/supabase-js';
import { LoggerService } from '../logger/logger.service';
import { User } from '@jet/interfaces/user.interface';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly _loggerService = inject(LoggerService);
  private readonly _supabaseService = inject(SupabaseService);
  private readonly _activatedRoute = inject(ActivatedRoute);

  private readonly _supabaseClient: SupabaseClient;
  private readonly _user: WritableSignal<User | null>;

  public constructor() {
    this._supabaseClient = this._supabaseService.supabaseClient;

    this._user = signal(null);

    this._supabaseClient.auth.onAuthStateChange(
      (_authChangeEvent: AuthChangeEvent, authSession: AuthSession | null) => {
        this._user.set(authSession?.user ?? null);
      },
    );

    this._loggerService.logServiceInitialization('AuthenticationService');
  }

  public get user(): Signal<User | null> {
    return this._user.asReadonly();
  }

  public getUser(): Promise<UserResponse> {
    return this._supabaseClient.auth.getUser();
  }

  public loginWithGoogle(): Promise<OAuthResponse> {
    const returnUrl =
      this._activatedRoute.snapshot.queryParamMap.get('returnUrl');
    let redirectTo = `${window.location.protocol}//${window.location.host}/login`;
    if (returnUrl !== null) {
      redirectTo += '?' + new URLSearchParams({ returnUrl }).toString();
    }
    return this._supabaseClient.auth.signInWithOAuth({
      options: { redirectTo },
      provider: 'google',
    });
  }

  public login(
    email: string,
    password: string,
  ): Promise<AuthTokenResponsePassword> {
    return this._supabaseClient.auth.signInWithPassword({ email, password });
  }

  public logout(): Promise<{ error: AuthError | null }> {
    return this._supabaseClient.auth.signOut();
  }

  public register(email: string, password: string): Promise<AuthResponse> {
    return this._supabaseClient.auth.signUp({ email, password });
  }

  public resetPassword(email: string) {
    return this._supabaseClient.auth.resetPasswordForEmail(email);
  }
}
