import { Injectable, computed, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface AuthResponse {
  token: string;
}

export interface Credentials {
  username: string;
  password: string;
  role?: 'ADMIN' | 'USER';
}

export interface UserSession {
  username: string;
  role: 'ADMIN' | 'USER';
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = '/api';
  private readonly storageKey = 'product-app-token';
  private sessionSignal = signal<UserSession | null>(this.restoreSession());

  session = computed(() => this.sessionSignal());
  isAuthenticated = computed(() => !!this.sessionSignal());
  isAdmin = computed(() => this.sessionSignal()?.role === 'ADMIN');

  constructor(private http: HttpClient) {}

  register(credentials: Credentials): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/auth/register`, credentials)
      .pipe(tap((res) => this.persistToken(res.token)));
  }

  login(credentials: Credentials): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/auth/login`, credentials)
      .pipe(tap((res) => this.persistToken(res.token)));
  }

  logout(): void {
    localStorage.removeItem(this.storageKey);
    this.sessionSignal.set(null);
  }

  private persistToken(token: string): void {
    localStorage.setItem(this.storageKey, token);
    const decoded = this.decodeToken(token);
    this.sessionSignal.set(decoded);
  }

  private restoreSession(): UserSession | null {
    const token = localStorage.getItem(this.storageKey);
    if (!token) {
      return null;
    }
    try {
      return this.decodeToken(token);
    } catch (error) {
      localStorage.removeItem(this.storageKey);
      return null;
    }
  }

  private decodeToken(token: string): UserSession {
    const [, payload] = token.split('.');
    const decoded = JSON.parse(atob(payload));
    return {
      username: decoded.sub,
      role: decoded.role,
      token,
    };
  }
}
